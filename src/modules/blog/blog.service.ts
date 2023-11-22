import { Blog } from '@prisma/client';
import prisma from '../../shared/prisma';

const insertIntoDB = async (payload: Blog): Promise<Blog> => {
  const result = await prisma.blog.create({
    data: payload,
  });
  return result;
};

const getAllFromDB = async (): Promise<Blog[]> => {
  const result = await prisma.blog.findMany();
  return result;
};

const getDataById = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteData = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BlogService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  deleteData,
};
