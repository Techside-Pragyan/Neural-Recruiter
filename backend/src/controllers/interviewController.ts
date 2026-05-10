import { Request, Response } from 'express';
import Interview from '../models/Interview';
import { generateInterviewQuestion, evaluateAnswer } from '../services/aiService';

export const startInterview = async (req: Request, res: Response) => {
  try {
    const { userId, jobRole, difficulty, type } = req.body;
    
    const newInterview = new Interview({
      userId,
      jobRole,
      difficulty,
      type,
      questions: [],
    });

    await newInterview.save();
    res.status(201).json(newInterview);
  } catch (error) {
    res.status(500).json({ message: 'Error starting interview', error });
  }
};

export const getNextQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findById(interviewId);
    
    if (!interview) {
      res.status(404).json({ message: 'Interview not found' });
      return;
    }

    const previousQuestions = interview.questions.map(q => q.question);
    const question = await generateInterviewQuestion(
      interview.jobRole,
      interview.difficulty,
      previousQuestions
    );

    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ message: 'Error generating question', error });
  }
};

export const submitAnswer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { interviewId } = req.params;
    const { question, answer } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      res.status(404).json({ message: 'Interview not found' });
      return;
    }

    const { score, feedback } = await evaluateAnswer(question, answer);

    interview.questions.push({ question, answer, feedback, score });
    
    // Update overall score
    const totalScore = interview.questions.reduce((acc, q) => acc + q.score, 0);
    interview.overallScore = totalScore / interview.questions.length;

    await interview.save();

    res.status(200).json({ score, feedback, overallScore: interview.overallScore });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting answer', error });
  }
};
