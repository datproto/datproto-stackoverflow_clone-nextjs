import mongoose, { Schema, Document } from 'mongoose';

interface IVote extends Document {
  user: mongoose.Schema.Types.ObjectId;
  content: mongoose.Schema.Types.ObjectId;
  voteType: 'upvote' | 'downvote';
  type: 'question' | 'answer';
  createdAt: Date;
  updatedAt: Date;
}

const VoteSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
  voteType: { type: String, enum: ['upvote', 'downvote'], required: true },
  type: { type: String, enum: ['question', 'answer'], required: true }
}, { timestamps: true });

const Vote = mongoose.model<IVote>('Vote', VoteSchema);

export default Vote;