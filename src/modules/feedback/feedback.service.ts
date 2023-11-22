import { Feedback } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../shared/prisma';
import { validateUser } from '../../utils/validateUser';

const insertIntoDB = async (
  payload: Feedback,
  user: JwtPayload
): Promise<Feedback> => {
  validateUser(user, payload?.userId);
  const result = await prisma.feedback.create({
    data: payload,
  });
  return result;
};

const getAllFromDB = async () => {
  const result = await prisma.feedback.findMany({
    include: {
      user: true,
    },
  });
  return result;
};

export const FeedbackService = {
  insertIntoDB,
  getAllFromDB,
};
