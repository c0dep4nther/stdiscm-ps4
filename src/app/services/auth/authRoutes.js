import express from 'express';
import { login, logout } from './authController.js';
const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);

export default router;
