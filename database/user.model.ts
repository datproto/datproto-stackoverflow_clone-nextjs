import { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar: string;
  phone?: string;
  bio?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  createdAt: Date;
  updatedAt: Date;
  saved: Schema.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  avatar: { type: String, required: true },
  phone: { type: String, required: false, unique: true },
  bio: { type: String, required: false },
  location: { type: String, required: false },
  portfolio: { type: String, required: false },
  reputation: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  saved: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

const User = models.Question || model<IUser>('User', UserSchema)

export default User