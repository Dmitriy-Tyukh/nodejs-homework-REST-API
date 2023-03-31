const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { catchAsync, AppError } = require('../utils');


// sing Token
const singToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res) => {
    const newUserData = req.body;
 
    const newUser = await User.create(newUserData);
   
    const { email, subscription, avatarURL } = newUser;

    newUser.password = undefined;
    res.status(201).json({
      email,
      subscription,
      avatarURL,
    });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new AppError(401, 'Email or password is wrong'));

  const passwordIsValid = await user.checkPassword(password, user.password);
  if (!passwordIsValid) return next(new AppError(401, 'Email or password is wrong'));

    const userWithToken = await User.findByIdAndUpdate({ _id: user.id }, { token: singToken(user.id) }, { new: true });
       
    user.password = undefined;

  res.status(200).json({
    user: {
      email,
      subscription: user.subscription,
    },
    token: userWithToken.token,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
    const currentUser = req.user;
    const userLogout = await User.findByIdAndUpdate({ _id: currentUser.id }, { token: null },{ new: true });
    req.user = userLogout;
        
    res.sendStatus(204);
})

