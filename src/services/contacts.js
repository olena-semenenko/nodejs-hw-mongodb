import { KEYS_OF_CONTACT } from '../constants/constants.js';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter = {},
  // userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsFilters = ContactsCollection.find();

  if (filter.contactType) {
    contactsFilters
      .where(KEYS_OF_CONTACT.contactType)
      .equals(filter.contactType);
  }
  if (typeof filter.isFavourite === 'boolean') {
    contactsFilters
      .where(KEYS_OF_CONTACT.isFavourite)
      .equals(filter.isFavourite);
  }
  // if (userId) {
  //   contactsFilters.where('parentId').equals(userId);
  // }

  const [totalItems, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsFilters).countDocuments(),
    ContactsCollection.find()
      .merge(contactsFilters)
      .skip(skip)
      .limit(limit)
      .sort({
        [sortBy]: sortOrder,
      })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(page, perPage, totalItems);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) =>
  await ContactsCollection.findById(contactId);

export const createContact = async (payload, userId) =>
  await ContactsCollection.create({ ...payload, parentId: userId });

export const updateContact = async (contactId, payload) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    { new: true },
  );

  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};
