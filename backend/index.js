import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'; 
import quizRoutes from './routes/quiz.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
