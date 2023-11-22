import { FAQ } from '@prisma/client';
import prisma from '../../shared/prisma';

const insertIntoDB = async (payload: FAQ): Promise<FAQ> => {
  const result = await prisma.fAQ.create({
    data: payload,
  });
  return result;
};

const getAllFromDB = async (): Promise<FAQ[]> => {
  const result = await prisma.fAQ.findMany();
  return result;
};

const getDataById = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteData = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.delete({
    where: {
      id,
    },
  });
  return result;
};

export const FAQService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  deleteData,
};
