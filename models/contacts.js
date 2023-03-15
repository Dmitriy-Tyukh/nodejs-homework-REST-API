const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid').v4;

const contactsPath = path.join('models', 'contacts.json');


const listContacts = async () => {
 
    return await fs.readFile(contactsPath, 'utf8');
  
};

const getById = async (contactId) => {

   const contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
   return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {

        const contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
        const updateContacts = contacts.filter((contact) => contact.id !== contactId);
        await fs.writeFile(contactsPath,JSON.stringify(updateContacts),'utf8');
};

const addContact = async (body) => {

      const { name, email, phone } = body;
      const users = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  
        const newUser = {
        id: uuid().slice(0, 5),
        name,
        email,
        phone,
  };
    users.push(newUser);
    await fs.writeFile(contactsPath, JSON.stringify(users));
    return newUser;
  
};

const updateContact = async (contactId, body) => {
    const { name, email, phone } = body;
    
      const contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
      const contactById = contacts.find((contact) => contact.id === contactId);
      if (name) contactById.name = name;
      if (email) contactById.email = email;
      if (phone) contactById.phone = phone;
        
      const contactIdx = contacts.findIndex((contact) => contact.id === contactId);

      contacts[contactIdx] = contactById;

      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return contactById;
      
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
