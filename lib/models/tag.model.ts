import {Document, model, models, Schema} from 'mongoose'

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[]; // Assuming each user has an ID (string)
  followers: Schema.Types.ObjectId[]; // Assuming each question has an ID (string)
  createdDate: string
}

const TagSchema = new Schema({
  name: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  questions: [{type: Schema.Types.ObjectId, ref: 'User'}],
  followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  createdDate: [{type: Date, default: Date.now}]
})

const Tag = models.Tag || model('Tag', TagSchema)

export default Tag