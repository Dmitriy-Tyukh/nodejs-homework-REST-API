const { updateUserSubscription } = require("../models/contacts");
const { catchAsync, AppError } = require("../utils");
const User = require('../models/userModel');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

exports.currentUser = catchAsync(async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
});

exports.updateSubscription = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const updatedUser = await updateUserSubscription(
    id,
    { subscription: req.body.subscription },
    { new: true }
  );
  const { email, subscription } = updatedUser;

  res.status(200).json({
    email,
    subscription,
  });
});

exports.updateAvatar = catchAsync(async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const avatarName = `${id}_${originalname}`;

  // create upload path
  const resultUpload = path.join(__dirname, '../', 'public', 'avatars', avatarName);
  try {
    // hendling avatar
    const file = await Jimp.read(tempUpload);
    file.resize(250, 250).write(tempUpload);

    // transfer file
    await fs.rename(tempUpload, resultUpload);

    // seve image for db
    const avatarURL = path.join('public', 'avatars', avatarName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
      
  } catch (error) {
    await fs.unlink(tempUpload);
    return next(new AppError(401, 'Not authorized'));
  }
});