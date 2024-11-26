import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): object | null => {
  try {
    const tokenValid =jwt.verify(token, SECRET_KEY);
    return ({tokenValid})
  } catch (err) {
    return null;
  }
};
