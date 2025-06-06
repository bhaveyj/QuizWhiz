import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const prisma = new PrismaClient();

export const generateQuiz = async (req, res) => {
  const { topic, difficulty } = req.body;
  const userId = req.user.userId;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
            Generate a quiz on "${topic}" with difficulty "${difficulty}".
            The quiz should include 5 multiple choice questions.
            Each question must have:
            - the question text
            - 4 options
            - 1 correct answer

            Respond in this JSON format:
            [
             {
                "question": "What is ...?",
                "options": ["A", "B", "C", "D"],
                "answer": "A"
             },
                ...
            ]`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]") + 1;
    const quizData = JSON.parse(text.slice(jsonStart, jsonEnd));

    const newQuiz = await prisma.quiz.create({
      data: {
        topic,
        difficulty,
        questions: quizData,
        userId,
      },
    });

    res.status(201).json(newQuiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate quiz" });
  }
};

export const getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quiz' });
  }
};

export const getUserQuizzes = async (req, res) => {
  const userId = req.user.userId;

  try {
    const quizzes = await prisma.quiz.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
};

export const submitQuiz = async (req, res) => {
  const quizId = req.params.id;
  const userAnswers = req.body.answers;
  const userId = req.user.userId;

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    if (quiz.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to submit this quiz' });
    }

    const questions = quiz.questions;
    let score = 0;

    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        score += 1;
      }
    });

    await prisma.quiz.update({
      where: { id: quizId },
      data: { score },
    });

    return res.status(200).json({ message: 'Quiz submitted', score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const summaryQuiz = async (req, res) => {
  try {
    const userId = req.user.userId;
    const total = await prisma.quiz.count({
      where: { userId },
    })
    const perfectScore = await prisma.quiz.count({
      where: {
        userId,
        score: 5
      }
    })
    res.json({total, perfectScore});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quiz summary' });
  }
}