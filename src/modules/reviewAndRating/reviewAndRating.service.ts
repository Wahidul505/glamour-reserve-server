import { ReviewAndRating } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../errors/ApiError';
import prisma from '../../shared/prisma';
import { validateUser } from '../../utils/validateUser';

const insertIntoDB = async (
  payload: ReviewAndRating,
  user: JwtPayload
): Promise<ReviewAndRating> => {
  validateUser(user, payload?.userId);
  const alreadyReviewed = await prisma.reviewAndRating.findFirst({
    where: {
      makeoverServiceId: payload?.makeoverServiceId,
      userId: payload?.userId,
    },
  });
  if (alreadyReviewed)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'We already received your review'
    );
  const result = await prisma.reviewAndRating.create({
    data: payload,
  });
  return result;
};

const updateData = async (
  payload: Partial<ReviewAndRating>,
  id: string,
  user: JwtPayload
): Promise<ReviewAndRating> => {
  const isExist = await prisma.reviewAndRating.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found');

  validateUser(user, isExist?.userId);

  const result = await prisma.reviewAndRating.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string, user: JwtPayload): Promise<void> => {
  const isExist = await prisma.reviewAndRating.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found');

  validateUser(user, isExist?.userId);

  await prisma.reviewAndRating.delete({
    where: {
      id,
    },
  });
};

const getReviews = async (): Promise<ReviewAndRating[]> => {
  const result = await prisma.reviewAndRating.findMany({
    include: {
      user: true,
    },
    take: 10,
  });
  return result;
};

export const ReviewAndRatingService = {
  insertIntoDB,
  updateData,
  deleteData,
  getReviews,
};
