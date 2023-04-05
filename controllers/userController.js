const Jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');
const { updateUserSubscription } = require("../models/contacts");
const User = require('../models/userModel');
const { catchAsync, AppError } = require("../utils");
const { sendEmail } = require('../utils')


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

exports.verifyToken = catchAsync(async (req, res, next) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });
    if (!user) return next(new AppError(404, "Not found"))

    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: null,
    });

    res.status(200).json({
        message: 'Verification successful',
    });
});

exports.resendingEmail = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    
    if (!email) return next(new AppError(400, 'missing required field email'));
   
    const user = await User.findOne({ email });
    if(!user) return next(new AppError(404, 'User not found, please signup'));
    
    if (user.verify) return next(new AppError(400, 'Verification has already been passed'));

    const mail = {
      to: email,
      subject: 'Проверка Email',
      html: `<a target="_blank" href="http://localhost:8080/api/users/verify/${user.verificationToken}"> Подтвердить Email </a>`,
    };

    await sendEmail(mail);

    res.status(200).json({
      mesaage: 'Verification email sent',
    });
})
