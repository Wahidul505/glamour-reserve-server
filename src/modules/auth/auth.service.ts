import { User, UserRole } from '@prisma/client';
import httpStatus from 'http-status';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import prisma from '../../shared/prisma';

const signUp = async (payload: User): Promise<string> => {
  const isUserExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  if (payload.role) {
    payload.role = UserRole.client;
  }

  const result = await prisma.user.create({
    data: payload,
  });

  const userInfo = {
    role: result.role,
    userId: result.id,
  };

  const token = jwtHelpers.createToken(
    userInfo,
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  return token;
};

const signIn = async (payload: Partial<User>): Promise<string> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  if (isUserExist.password !== payload.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password didn't matched");
  }

  const userInfo = {
    role: isUserExist.role,
    userId: isUserExist.id,
  };

  const token = jwtHelpers.createToken(
    userInfo,
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );
  return token;
};

export const AuthService = {
  signUp,
  signIn,
};
