import express from 'express';
import { generateQuiz, getQuizById, getUserQuizzes, submitQuiz, summaryQuiz } from '../controllers/quizController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/summary', authMiddleware, summaryQuiz);
router.post('/generate', authMiddleware, generateQuiz);
router.get('/:id', authMiddleware, getQuizById);
router.get('/', authMiddleware, getUserQuizzes);
router.post('/:id/submit', authMiddleware, submitQuiz);


export default router;
