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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/muilter.js';

export const contactsRouter = Router();
contactsRouter.use('/', authenticate);

contactsRouter.use('/:contactsId', validateMongoId('contactsId'));

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactsId', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  upload.single('photo'),
  validationBody(contactCreateValidationSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactsId',
  upload.single('photo'),
  validationBody(contactUpdateValidationSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete('/:contactsId', ctrlWrapper(deleteContactController));
