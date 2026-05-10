import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  firebaseUid?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    firebaseUid: { type: String, unique: true, sparse: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
