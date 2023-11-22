import express from 'express';
import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post('/', BookingController.insertIntoDB);

router.patch(
  '/:id/update-status',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.updateBookingStatus
);

router.get(
  '/my-booking',
  auth(ENUM_USER_ROLE.CLIENT),
  BookingController.getMyBookings
);

router.get(
  '/:id/my-booking',
  auth(ENUM_USER_ROLE.CLIENT),
  BookingController.getMyBookingById
);

router.delete(
  '/:id/my-booking',
  auth(ENUM_USER_ROLE.CLIENT),
  BookingController.deleteMyBooking
);

router.get('/:date/by-date', BookingController.getBookingsByDate);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getAllFromDB
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getDataById
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.updateData
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.deleteData
);

export const BookingRoutes = router;
