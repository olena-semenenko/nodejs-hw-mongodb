import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const contactId = req.params.contactsId;

  if (!mongoose.isValidObjectId(contactId)) {
    return res.status(404).json({
      status: 404,
      message: `Id ${contactId} is not valid`,
    });
  }
  const contact = await getContactById(contactId);

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
// POST
export const createContactController = async (req, res) => {
  const { body } = req;
  const contact = await createContact(body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

// PATCH
export const patchContactController = async (req, res, next) => {
  const contactId = req.params.contactsId;
  const { body } = req;

  const { contact } = await updateContact(contactId, body);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: contact,
  });
};

// DELETE
export const deleteContactController = async (req, res, next) => {
  const contactId = req.params.contactsId;
  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
