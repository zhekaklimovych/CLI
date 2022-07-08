const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async ()=> {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
}

const getContactById = async (contactId)=> {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id == contactId);
    return contact;
}

const removeContact = async (contactId)=> {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    const removedContact = contacts.splice(index, 1);
    await updateContacts(contacts);
    return removedContact;
}

const addContact = async (name, email, phone)=> {
    const contacts = await listContacts();
    const newContact = {
        id: JSON.stringify(contacts.length + 1),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}

