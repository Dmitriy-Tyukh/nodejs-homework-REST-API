const { listContacts, getById, removeContact, addContact, updateContact } = require('../models/contacts');
const { catchAsync } = require('../utils');

exports.getContactsList = catchAsync(async (req, res, next) => {
    const contactsList = JSON.parse(await listContacts());
    res.status(200).send(contactsList);
});

exports.getContactsById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    res.status(200).send(await getById(id));
    
});

exports.deleteContact = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await removeContact(id);
    res.status(200).json({ message: 'contact deleted' });
});

exports.postContact = catchAsync(async (req, res, next) => {

    res.status(201).send(await addContact(req.body));
});

exports.updateContact = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    res.status(200).send(await updateContact(id, body));
});