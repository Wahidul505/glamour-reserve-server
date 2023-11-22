import express from 'express';
import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { AdminController } from './admin.controller';

const router = express.Router();

router.get(
  '/get-user',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getAllFromDB
);

router.get(
  '/get-user/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getDataById
);

router.patch(
  '/update-user/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.updateData
);

router.delete(
  '/delete-user/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteData
);

router.patch(
  '/user-role/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.updateUserRole
);

router.post(
  '/create-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.addNewAdmin
);

export const AdminRoutes = router;
