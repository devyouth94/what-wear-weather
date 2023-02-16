import { hash, compare } from 'bcryptjs';

const SALT_ROUND = 12;

export const hashPassword = async (password: string) => {
  return await hash(password, SALT_ROUND);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};
