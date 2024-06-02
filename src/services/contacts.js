import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};
export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};
export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const updateContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
  );

  return updateContact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};
