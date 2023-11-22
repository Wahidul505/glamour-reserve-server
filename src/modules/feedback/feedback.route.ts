import express from 'express';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { FeedbackController } from './feedback.controller';
import { FeedbackValidation } from './feedback.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.CLIENT),
  validateRequest(FeedbackValidation.create),
  FeedbackController.insertIntoDB
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FeedbackController.getAllFromDB
);

export const FeedbackRoutes = router;
