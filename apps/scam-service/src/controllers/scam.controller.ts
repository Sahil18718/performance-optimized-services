import { Request, Response } from 'express';
import { Scam } from '../models/scam.model';
import { getCache, setCache } from '@performance-optimized-services/caching';

export const reportScam = async (req: Request, res: Response): Promise<void> => {
  const { type, value, details } = req.body;

  if (!type || !value || !details) {
    res.status(400).send({ message: 'Invalid input' });
    return;
  }

  try {
    const existingScam = await Scam.findOne({ value });
    if (existingScam) {
      existingScam.reportsCount += 1;
      await existingScam.save();
      res.status(200).send({ message: 'Scam report updated successfully' });
    } else {
      const scam = new Scam({ type, value, details });
      await scam.save();
      res.status(201).send({ message: 'Scam reported successfully' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const getScamList = async (req: Request, res: Response): Promise<void> => {
  try {
    const scams = await Scam.find().sort({ reportsCount: -1 }).limit(10);
    res.send({ scams });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const getScamStatus = async (req: Request, res: Response): Promise<void> => {
  const { value } = req.query;

  if (!value) {
    res.status(400).send({ message: 'Value is required' });
    return;
  }

  try {
    const cacheKey = `scam-status:${value}`;
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      res.send(cachedData);
      return;
    }

    const scam = await Scam.findOne({ value });
    const result = scam
      ? { isScam: true, reports: scam.reportsCount }
      : { isScam: false, reports: 0 };

    await setCache(cacheKey, result);

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
