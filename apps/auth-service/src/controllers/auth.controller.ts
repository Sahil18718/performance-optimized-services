import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../model/user.model';
import { generateToken, verifyToken } from '../utils/jwt.util';

export const get = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(201).send({ message: 'Auth services app is running find' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: 'Invalid input' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).send({ message: 'User already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ email, passwordHash });

    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: 'Invalid input' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).send({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken({ email: user.email });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const verify = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;
    const isValid = !!verifyToken(token);

    res.send({ isValid });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
