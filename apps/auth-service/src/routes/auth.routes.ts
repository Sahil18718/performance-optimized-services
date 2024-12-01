import { Router } from 'express';
import { get, register, login, verify } from '../controllers/auth.controller';

const router = Router();
router.get('/get', get);
router.post('/register', register);
router.post('/login', login);
router.post('/verify', verify);

export default router;
