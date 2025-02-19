import mongoose, { Schema, Document } from 'mongoose';

interface IInteraction extends Document {
  user: mongoose.Schema.Types.ObjectId;
  action: string;
  actionId: mongoose.Schema.Types.ObjectId;
  actionType: 'question' | 'answer';
  createdAt: Date;
  updatedAt: Date;
}

const InteractionSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  actionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  actionType: { type: String, enum: ['question', 'answer'], required: true }
}, { timestamps: true });

const Interaction = mongoose.model<IInteraction>('Interaction', InteractionSchema);

export default Interaction;