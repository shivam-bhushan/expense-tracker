import express from 'express'
import { signup, login, getUserDetails } from '../controllers/userControllers.js';
import { verifyRoute } from '../middleware/verifyRoute.js';

export const router = express.Router();

router.post('/', signup);
router.post('/login', login);
router.get('/profile', verifyRoute, getUserDetails);
