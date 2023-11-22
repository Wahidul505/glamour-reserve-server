import { Booking } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { bookingFilterableFields } from './booking.constants';
import { BookingService } from './booking.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.insertIntoDB(req.body);
  sendResponse<Booking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booked Successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
  const result = await BookingService.getAllFromDB(filters, options);
  sendResponse<Booking[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings fetched',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getDataById(req.params.id);
  sendResponse<Booking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking fetched',
    data: result,
  });
});

const updateData = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.updateData(req.params.id, req.body);
  sendResponse<Booking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking updated',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.deleteData(req.params.id);
  sendResponse<Booking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking deleted',
    data: result,
  });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const status = req.body.status;
  await BookingService.updateBookingStatus(id, status);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Booking ${status}`,
  });
});

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const result = await BookingService.getMyBookings(userId);
  sendResponse<Booking[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings fetched',
    data: result,
  });
});

const getMyBookingById = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const bookingId = req?.params?.id;
  const result = await BookingService.getMyBookingById(userId, bookingId);
  sendResponse<Booking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking fetched',
    data: result,
  });
});

const deleteMyBooking = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const bookingId = req?.params?.id;
  await BookingService.deleteMyBooking(userId, bookingId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking deleted',
  });
});

const getBookingsByDate = catchAsync(async (req: Request, res: Response) => {
  const date = req?.params?.date;
  const result = await BookingService.getBookingsByDate(date as string);
  sendResponse<Partial<Booking>[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot fetched',
    data: result,
  });
});

export const BookingController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateData,
  deleteData,
  updateBookingStatus,
  getMyBookings,
  getMyBookingById,
  deleteMyBooking,
  getBookingsByDate,
};
