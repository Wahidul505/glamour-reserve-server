import express from 'express';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { ReviewAndRatingController } from './reviewAndRating.controller';
import { ReviewAndRatingValidation } from './reviewAndRating.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.CLIENT),
  validateRequest(ReviewAndRatingValidation.create),
  ReviewAndRatingController.insertIntoDB
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.CLIENT),
  validateRequest(ReviewAndRatingValidation.update),
  ReviewAndRatingController.updateData
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.CLIENT),
  ReviewAndRatingController.deleteData
);

router.get('/', ReviewAndRatingController.getReviews);

export const ReviewAndRatingRoutes = router;
