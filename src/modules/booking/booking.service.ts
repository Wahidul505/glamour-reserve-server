import { Booking, BookingStatus, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import prisma from '../../shared/prisma';
import { bookingSearchableFields } from './booking.constants';
import { BookingUtils } from './booking.utils';

const insertIntoDB = async (payload: Booking): Promise<Booking> => {
  await BookingUtils.checkSlotAvailability(payload);

  const result = await prisma.booking.create({
    data: payload,
  });

  return result;
};

const getAllFromDB = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
  const { page, size } = paginationHelpers.calculatePagination(options);
  const { search, ...filtersData } = filters;

  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: bookingSearchableFields.map((field: any) => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : { AND: {} };
  const result = await prisma.booking.findMany({
    where: whereConditions,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      makeoverService: {
        include: {
          category: true,
        },
      },
      user: true,
    },
  });

  const total = await prisma.booking.count({
    where: whereConditions,
  });

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateData = async (id: string, payload: any): Promise<Booking> => {
  await BookingUtils.checkSlotAvailability(payload, id);
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string): Promise<Booking> => {
  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateBookingStatus = async (
  id: string,
  status: BookingStatus
): Promise<void> => {
  await prisma.booking.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

const getMyBookings = async (userId: string): Promise<Booking[]> => {
  const result = await prisma.booking.findMany({
    where: {
      userId,
    },
    include: {
      makeoverService: {
        include: {
          category: true,
        },
      },
      user: true,
    },
  });
  return result;
};

const getMyBookingById = async (
  userId: string,
  bookingId: string
): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id: bookingId,
      userId,
    },
    include: {
      makeoverService: {
        include: {
          category: true,
        },
      },
      user: true,
    },
  });
  return result;
};

const deleteMyBooking = async (
  userId: string,
  bookingId: string
): Promise<void> => {
  const exist = await prisma.booking.findUnique({
    where: {
      id: bookingId,
      userId,
    },
  });
  if (exist && exist.status === BookingStatus.confirmed) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "Your booking is confirmed. You can't cancel the booking"
    );
  }

  await prisma.booking.delete({
    where: {
      id: bookingId,
      userId,
    },
  });
};

const getBookingsByDate = async (date: string): Promise<Partial<Booking>[]> => {
  const result = await prisma.booking.findMany({
    where: {
      date: date,
    },
    select: {
      startTime: true,
      endTime: true,
    },
  });
  return result;
};

export const BookingService = {
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
