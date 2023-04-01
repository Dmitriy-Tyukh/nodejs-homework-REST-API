const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const User = require('../models/userModel');
const { catchAsync, loginUserValidator, singupUserValidator, AppError, userSubscriptionValidator } = require('../utils');


exports.checkSingupData = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    
    const avatarHash = gravatar.url(email);
    const avatarURL = `${avatarHash}?d=wavatar`;
  
  const { error, value } = singupUserValidator({ email, password, avatarURL });
  if (error) return next( new AppError( 400, error.details.map((err) => err.message)));

  const userExist = await User.exists({ email: value.email });
  if (userExist) next(new AppError(409, 'Email in use'));

  req.body = value;
console.log(value)
  next();
});

exports.checkLoginData = catchAsync(async (req, res, next) => {
    const { error } = loginUserValidator(req.body);
    if (error) return next(new AppError(400, error.details.map((err) => err.message)));
    next();
})

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];
    if (!token) return next(new AppError(401, 'Not authorized'));
    
    let decoded = '';
    
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return next(new AppError(401, 'Not authorized'));
    }

  const currentUser = await User.findById(decoded.id);
  if (!currentUser || currentUser.token === null) return next(new AppError(401, 'Not authorized'));

    req.user = currentUser;

  next();
});

exports.subscription = catchAsync(async (req, res, next) => {
    const { error, value } = userSubscriptionValidator(req.body);
    if (error) return next(new AppError(400, `Missing required ${error.details[0].message} field!`));
    req.body = value;
  next()
})