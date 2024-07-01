import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

export const authRouter = Router();
authRouter.post(
  '/register',
  validationBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validationBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post(
  '/send-reset-email',
  validationBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validationBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
