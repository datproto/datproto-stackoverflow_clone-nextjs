import mongoose, { Schema, Document } from 'mongoose';

interface ICollection extends Document {
  authhor: mongoose.Types.ObjectId;
  question: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema: Schema = new Schema({
  authhor: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Types.ObjectId, ref: 'Question', required: true },
}, { timestamps: true });

const Collection = mongoose.model<ICollection>('Collection', CollectionSchema);

export default Collection;