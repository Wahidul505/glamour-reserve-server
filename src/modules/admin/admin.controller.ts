import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { AdminService } from './admin.service';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllFromDB();
  sendResponse<Partial<User>[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.params?.id;
  const user = req?.user;
  const result = await AdminService.getDataById(userId, user as JwtPayload);
  sendResponse<Partial<User>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User fetched successfully',
    data: result,
  });
});

const updateData = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.params?.id;
  const user = req?.user;
  const payload = req?.body;
  const result = await AdminService.updateData(
    userId,
    user as JwtPayload,
    payload
  );
  sendResponse<Partial<User>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.params?.id;
  const user = req?.user;
  const result = await AdminService.deleteData(userId, user as JwtPayload);
  sendResponse<Partial<User>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.params?.id;
  const user = req?.user;
  const role = req?.body?.role;
  await AdminService.updateUserRole(userId, user as JwtPayload, role);
  sendResponse<Partial<User>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User role updated successfully',
  });
});

const addNewAdmin = catchAsync(async (req: Request, res: Response) => {
  await AdminService.addNewAdmin(req?.body);
  sendResponse<Partial<User>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin created',
  });
});

export const AdminController = {
  getAllFromDB,
  getDataById,
  updateData,
  deleteData,
  updateUserRole,
  addNewAdmin,
};
