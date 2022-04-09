import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
  const myPassword = await hash(password, 12);
  return myPassword;
}

export async function verifyPasword(password, hashedPassword) {
  const isMatch = await compare(password, hashedPassword);

  return isMatch;
}
