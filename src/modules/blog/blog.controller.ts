import { Blog } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { BlogService } from './blog.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const payload = req?.body;
  const result = await BlogService.insertIntoDB(payload);
  sendResponse<Blog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog Published',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getAllFromDB();
  sendResponse<Blog[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blogs Fetched',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await BlogService.getDataById(id as string);
  sendResponse<Blog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog Fetched',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await BlogService.deleteData(id);
  sendResponse<Blog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog Deleted',
    data: result,
  });
});

export const BlogController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  deleteData,
};
