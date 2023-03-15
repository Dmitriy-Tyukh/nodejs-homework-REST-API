const fs = require('fs').promises;
const path = require('path');
const {
    AppError,
    catchAsync,
    postValidator,
    putValidator,
} = require('../utils');

const contactsPath = path.join('models', 'contacts.json');

const checkContactById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (id.length > 5) return next(new AppError(400, 'Invalid Id'));

  const contactList = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  const contact = contactList.find((contact) => contact.id === id);

  if (!contact) return next(new AppError(404, 'Not Found'));

  next();
});

const chekContactByPostBody = catchAsync(async (req, res, next) => {
  const { error } = postValidator(req.body);
  if (error) return next(new AppError(400, `missing required ${error.details[0].message}`));

  next();
});

const chekContactByPutBody = catchAsync(async (req, res, next) => {
 
    const { error, value } = putValidator(req.body);
    if (error) return next(new AppError(400, error.details[0].message));
    if (JSON.stringify(value) === '{}') return next(new AppError(400, 'missing fields'))
      
    next();
});

module.exports = {
  checkContactById,
  chekContactByPostBody,
  chekContactByPutBody,
};
