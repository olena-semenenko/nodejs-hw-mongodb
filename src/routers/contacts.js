import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../middlewares/validateBody.js';
import {
  contactCreateValidationSchema,
  contactUpdateValidationSchema,
} from '../validation/contact.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';

export const contactsRouter = Router();
contactsRouter.use('/:contactsId', validateMongoId('contactsId'));

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactsId', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  validationBody(contactCreateValidationSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactsId',
  validationBody(contactUpdateValidationSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete('/:contactsId', ctrlWrapper(deleteContactController));
