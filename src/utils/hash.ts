import bcrypt from "bcrypt";

const hashround = 10;

export const hashPassword = async (password: string): Promise<string> => {
  let hashed = await bcrypt.hash(password, hashround);
  return hashed
};


export const comparePassword = async (
  password: string,
  hashed: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashed);
};
