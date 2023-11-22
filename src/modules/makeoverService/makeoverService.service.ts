import { MakeoverService, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import prisma from '../../shared/prisma';
import { makeoverServiceSearchableFields } from './makeoverService.constants';

const insertIntoDB = async (payload: any) => {
  const result = await prisma.makeoverService.create({
    data: payload,
  });
  return result;
};

const getAllFromDB = async (
  filters: any,
  options: IPaginationOptions
): Promise<MakeoverService[]> => {
  const { search, maxPrice, minPrice, ...filtersData } = filters;

  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: makeoverServiceSearchableFields.map((field: any) => ({
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

  if (maxPrice) {
    andConditions.push({
      price: {
        lte: parseFloat(maxPrice),
      },
    });
  }

  if (minPrice) {
    andConditions.push({
      price: {
        gte: parseFloat(minPrice),
      },
    });
  }

  const whereConditions: Prisma.MakeoverServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : { AND: {} };
  const result = await prisma.makeoverService.findMany({
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
      category: true,
    },
  });

  return result;
};

const getDataById = async (id: string): Promise<MakeoverService | null> => {
  const result = await prisma.makeoverService.findUnique({
    where: {
      id,
    },
    include: {
      reviewAndRatings: {
        include: {
          user: true,
        },
      },
      category: true,
    },
  });
  return result;
};

const updateData = async (
  id: string,
  payload: any
): Promise<MakeoverService> => {
  const result = await prisma.makeoverService.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string): Promise<MakeoverService> => {
  const result = await prisma.makeoverService.delete({
    where: {
      id,
    },
  });
  return result;
};

const getByCategory = async (
  id: string,
  options: IPaginationOptions
): Promise<IGenericResponse<MakeoverService[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.makeoverService.findMany({
    where: {
      categoryId: id,
    },
    skip,
    take: size,
    include: {
      reviewAndRatings: {
        include: {
          user: true,
        },
      },
    },
  });

  const total = await prisma.makeoverService.count({
    where: {
      categoryId: id,
    },
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

export const MakeoverServiceService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateData,
  deleteData,
  getByCategory,
};
