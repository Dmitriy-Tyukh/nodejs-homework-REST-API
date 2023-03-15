const express = require('express');
const { getContactsList, getContactsById, deleteContact, postContact, updateContact} = require('../../controllers/contactController');
const {
  checkContactById,
  chekContactByPostBody,
  chekContactByPutBody,
} = require('../../middlewares/contactMiddlewares');

// const {
//   validatedContactOnPost,
//   validatedContactOnPut,
// } = require('../../utils');

const router = express.Router();

router.get('/', getContactsList);

router.get('/:id', checkContactById, getContactsById);

router.post('/', chekContactByPostBody, postContact);

router.delete('/:id', checkContactById, deleteContact);

router.put('/:id', chekContactByPutBody, checkContactById, updateContact);

module.exports = router;
