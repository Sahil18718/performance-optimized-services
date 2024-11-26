import { Router } from 'express';
import { reportScam, getScamList, getScamStatus } from '../controllers/scam.controller';

const router = Router();

router.post('/report-scam', reportScam);
router.get('/scam-list', getScamList);
router.get('/scam-status', getScamStatus);

export default router;