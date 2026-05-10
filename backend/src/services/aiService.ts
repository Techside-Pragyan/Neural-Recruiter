import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key_for_now',
});

export const generateInterviewQuestion = async (
  jobRole: string,
  difficulty: string,
  previousQuestions: string[]
): Promise<string> => {
  try {
    const prompt = `You are an expert technical interviewer for a ${jobRole} position. The difficulty level is ${difficulty}.
    Previous questions asked: ${previousQuestions.join(', ') || 'None'}.
    Please generate the next interview question. Do not repeat previous questions. Provide only the question text.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 150,
    });

    return response.choices[0].message?.content?.trim() || 'Tell me about yourself.';
  } catch (error) {
    console.error('Error generating question:', error);
    return 'Could you describe a challenging project you worked on recently?';
  }
};

export const evaluateAnswer = async (
  question: string,
  answer: string
): Promise<{ score: number; feedback: string }> => {
  try {
    const prompt = `You are an expert technical interviewer evaluating a candidate's answer.
    Question: ${question}
    Candidate's Answer: ${answer}
    
    Provide a score out of 10 and detailed feedback on how to improve.
    Format your response as JSON: { "score": 8, "feedback": "Good answer, but could include more specific examples." }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 250,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(response.choices[0].message?.content || '{}');
    return {
      score: result.score || 5,
      feedback: result.feedback || 'Average response. Try to be more specific.',
    };
  } catch (error) {
    console.error('Error evaluating answer:', error);
    return { score: 5, feedback: 'Unable to evaluate answer at this time.' };
  }
};
