import mongoose, { Document, Schema } from 'mongoose';

export interface IInterview extends Document {
  userId: mongoose.Types.ObjectId;
  jobRole: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: string;
  questions: Array<{
    question: string;
    answer: string;
    feedback: string;
    score: number;
  }>;
  overallScore: number;
  status: 'In Progress' | 'Completed';
  createdAt: Date;
  updatedAt: Date;
}

const interviewSchema = new Schema<IInterview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    jobRole: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    type: { type: String, required: true },
    questions: [
      {
        question: { type: String },
        answer: { type: String },
        feedback: { type: String },
        score: { type: Number },
      },
    ],
    overallScore: { type: Number, default: 0 },
    status: { type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' },
  },
  { timestamps: true }
);

export default mongoose.model<IInterview>('Interview', interviewSchema);
