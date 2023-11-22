import express from 'express';
import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { BlogController } from './blog.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BlogController.insertIntoDB
);

router.get('/', BlogController.getAllFromDB);

router.get('/:id', BlogController.getDataById);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BlogController.deleteData
);

export const BlogRoutes = router;
