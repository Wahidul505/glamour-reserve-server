import { MakeoverService } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { makeoverServiceFilterableFields } from './makeoverService.constants';
import { MakeoverServiceService } from './makeoverService.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await MakeoverServiceService.insertIntoDB(req.body);
  sendResponse<MakeoverService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, makeoverServiceFilterableFields);
  const options = pick(req.query, ['sortBy', 'sortOrder']);
  const result = await MakeoverServiceService.getAllFromDB(filters, options);
  sendResponse<MakeoverService[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services fetched successfully',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await MakeoverServiceService.getDataById(req.params.id);
  sendResponse<MakeoverService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service fetched successfully',
    data: result,
  });
});

const updateData = catchAsync(async (req: Request, res: Response) => {
  const result = await MakeoverServiceService.updateData(
    req.params.id,
    req.body
  );
  sendResponse<MakeoverService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const result = await MakeoverServiceService.deleteData(req.params.id);
  sendResponse<MakeoverService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service deleted successfully',
    data: result,
  });
});

const getByCategory = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['size', 'page']);
  const categoryId = req.params.categoryId;
  const result = await MakeoverServiceService.getByCategory(
    categoryId,
    options
  );
  sendResponse<MakeoverService[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const MakeoverServiceController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateData,
  deleteData,
  getByCategory,
};
