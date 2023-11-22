import express from 'express';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';

import { MakeoverServiceController } from './makeoverService.controller';
import { MakeoverServiceValidation } from './makeoverService.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(MakeoverServiceValidation.create),
  MakeoverServiceController.insertIntoDB
);

router.get('/', MakeoverServiceController.getAllFromDB);

router.get('/:id', MakeoverServiceController.getDataById);

router.get('/:categoryId/category', MakeoverServiceController.getByCategory);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(MakeoverServiceValidation.update),
  MakeoverServiceController.updateData
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  MakeoverServiceController.deleteData
);

export const MakeoverServiceRoutes = router;
