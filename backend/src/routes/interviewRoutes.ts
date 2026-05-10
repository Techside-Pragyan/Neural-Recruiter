import { Router } from 'express';
import { startInterview, getNextQuestion, submitAnswer } from '../controllers/interviewController';

const router = Router();

router.post('/start', startInterview);
router.get('/:interviewId/next-question', getNextQuestion);
router.post('/:interviewId/submit-answer', submitAnswer);

export default router;
