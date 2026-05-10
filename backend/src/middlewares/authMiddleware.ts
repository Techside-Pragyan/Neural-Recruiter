import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

// Initialize Firebase Admin (Make sure to provide serviceAccountKey.json path or env variables)
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    // For now, bypass actual verification if not configured
    if (!process.env.FIREBASE_PROJECT_ID) {
        req.body.user = { uid: 'dummy_uid' };
        return next();
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.body.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Unauthorized' });
  }
};
