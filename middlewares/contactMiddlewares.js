const { Types } = require('mongoose');

const { AppError, catchAsync, postValidator, putValidator } = require('../utils');
const Contact = require('../models/contactModel');

exports.id = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const isValidId = Types.ObjectId.isValid(id);
  if (!isValidId) return next(new AppError(400, 'Invalid contact id..'));

  const userExist = await Contact.exists({ _id: id });
  if (!userExist) return next(new AppError(404, `Contact with this id:${id} does not exist..`));

  next();
});

exports.createBody = catchAsync(async (req, res, next) => {
  const { error, value } = postValidator(req.body);
    if (error) return next(new AppError(400, `missing required: ${error.details.map((err) => err.message)}`));
    
  const contactExist = await Contact.exists({ email: value.email });
    if (contactExist) next(new AppError(409, 'Contact with this email already exists..'));
    
    req.body = value;
    
  next();
});

exports.updateBody = catchAsync(async (req, res, next) => {
    const { error, value } = putValidator(req.body);

    if (error) return next(new AppError(400, error.details[0].message));

    const userExist = await Contact.exists({ email: value.email });
    if (userExist) next(new AppError(409, 'Contact with this email already exists..'));

    req.body = value;

    next();
});

exports.status = catchAsync (async (req, res, next) => {
    const { error, value } = putValidator(req.body);

    if (error) return next(new AppError(400, error.details[0].message));
    if (!Object.keys(value).includes('favorite')) return next(new AppError(400, 'missing field favorite'));
    
    next();
})

