import {Document, model, models, Schema} from 'mongoose'

export interface IQuestion extends Document {
  title: string
  content: string
  author: Schema.Types.ObjectId
  tags: Schema.Types.ObjectId[]
  views: number
  upVotes: Schema.Types.ObjectId[]
  downVotes: Schema.Types.ObjectId[]
  answers: Schema.Types.ObjectId[]
}

const QuestionSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // Establishing a one-to-many relationship with the User model
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}], // Establishing a one-to-many relationship with the Tag model
  views: {type: Number, default: 0},
  upVotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  downVotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}] //  // Establishing a one-to-many relationship with the Answer model
}, {
  timestamps: true
})

const Question = models.Question || model('Question', QuestionSchema)

export default Question