import { ReviewAndRating } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ReviewAndRatingService } from './reviewAndRating.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user;
  const payload = req?.body;
  const result = await ReviewAndRatingService.insertIntoDB(
    payload,
    user as JwtPayload
  );
  sendResponse<ReviewAndRating>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review Posted',
    data: result,
  });
});

const updateData = catchAsync(async (req: Request, res: Response) => {
  const payload = req?.body;
  const id = req?.params?.id;
  const user = req?.user;
  const result = await ReviewAndRatingService.updateData(
    payload,
    id,
    user as JwtPayload
  );
  sendResponse<ReviewAndRating>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review Posted',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const user = req?.user;
  await ReviewAndRatingService.deleteData(id, user as JwtPayload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review Removed',
  });
});

const getReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewAndRatingService.getReviews();
  sendResponse<ReviewAndRating[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews Fetched',
    data: result,
  });
});

export const ReviewAndRatingController = {
  insertIntoDB,
  updateData,
  deleteData,
  getReviews,
};
