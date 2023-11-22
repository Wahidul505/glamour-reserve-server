import { FAQ } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { FAQService } from './faq.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const payload = req?.body;
  const result = await FAQService.insertIntoDB(payload);
  sendResponse<FAQ>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'FAQ Published',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await FAQService.getAllFromDB();
  sendResponse<FAQ[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'FAQs Fetched',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await FAQService.getDataById(id as string);
  sendResponse<FAQ>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'FAQ Fetched',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await FAQService.deleteData(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'FAQ Deleted',
    data: result,
  });
});

export const FAQController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  deleteData,
};
