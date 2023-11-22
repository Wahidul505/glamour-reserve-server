import { Category, Prisma } from '@prisma/client';
import prisma from '../../shared/prisma';

const insertIntoDB = async (
  payload: Prisma.CategoryCreateInput
): Promise<Category> => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllFromDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({
    include: {
      makeoverServices: true,
    },
  });
  return result;
};

const getDataById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      makeoverServices: true,
    },
  });
  return result;
};

const updateData = async (
  id: string,
  payload: Partial<Prisma.CategoryUpdateInput>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateData,
  deleteData,
};
