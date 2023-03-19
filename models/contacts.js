const Contact = require('../models/contactModel');

const listContacts = async () => {
    const contacts =  await Contact.find();
    return contacts;
};

const getById = async (contactId) => {
    const contactById = await Contact.findById(contactId);
    return contactById;
};

const removeContact = async (contactId) => {
    return await Contact.findByIdAndDelete(contactId);
};

const addContact = async (body) => {
    const newContact = await Contact.create(body);
    return newContact;
};

const updateContact = async (contactId, fields) => {
    const updateContact = await Contact.findByIdAndUpdate({ _id: contactId }, fields, { new: true });
    return updateContact;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
