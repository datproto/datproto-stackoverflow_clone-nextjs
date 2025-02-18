import { Document, model, models, Schema } from 'mongoose';

interface ITag extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
}

const TagSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const Tag = models.Tag || model<ITag>('Tag', TagSchema);

export default Tag;