const { listContacts, getById, removeContact, addContact, updateContact } = require('../models/contacts');
const { catchAsync } = require('../utils');

exports.get = catchAsync(async (req, res, next) => {
    const contactsList = await listContacts();
    res.status(200).send(contactsList);
});

exports.getById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    res.status(200).send(await getById(id));
});

exports.delete = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await removeContact(id);
    res.status(200).json({ message: 'contact deleted' });
});

exports.create = catchAsync(async (req, res, next) => {

    res.status(201).send(await addContact(req.body));
});

exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  res.status(200).send(await updateContact(id, { name, email, phone }));
});

exports.updateStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateStatus = await updateContact(id, { favorite: req.body.favorite }, { new: true });
  res.status(200).send(updateStatus);
});