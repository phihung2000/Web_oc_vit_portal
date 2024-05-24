// utils/hashPassword.ts
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function verifyPassword(password: string, userName: string): Promise<boolean> {
  const storedHashedPassword = await hashPassword('12345678@Ocvit');
  const storedHashedUserName = await hashPassword('0399999999')
  const isMatch = await bcrypt.compare(password, storedHashedPassword);
  const isMatchUserName = await bcrypt.compare(userName, storedHashedUserName);
  return isMatch && isMatchUserName;
}
export const  setAuthToken = async() => {
    const token = uuidv4() + '123@Ocvit';
    await Cookies.set('token', token, { expires: 7, secure: true });
}