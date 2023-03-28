const Contact = require('../models/contactModel');
const User = require('./userModel');

const listContacts = async (page, limit, favorite) => {
  const paginationPage = +page || 1;
  const paginationLimit = +limit || 20;
  const skip = (paginationPage - 1) * paginationLimit;
    
  const favoriteQuery = favorite ? {favorite: `${favorite}`} : { };
    
  return await Contact.find(favoriteQuery).skip(skip).limit(paginationLimit);

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

const updateUserSubscription = async (id, field) => {
  return await User.findByIdAndUpdate({ _id: id }, field, { new: true });
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateUserSubscription,
};
