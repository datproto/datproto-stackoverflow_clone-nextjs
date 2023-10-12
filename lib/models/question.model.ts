import {Document, model, models, Schema} from 'mongoose'

export interface IQuestion extends Document {
  title: string
  content: string
  tags: Schema.Types.ObjectId[]
  createdDate: string
  views: number
  upVotes: Schema.Types.ObjectId[]
  downVotes: Schema.Types.ObjectId[]
  author: Schema.Types.ObjectId
  answers: Schema.Types.ObjectId[]
}

const QuestionSchema = new Schema({
  title: {type: String, required: true},
  questionDetails: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // Establishing a one-to-many relationship with the User model
  createdDate: {type: Date, default: Date.now},
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}], //  // Establishing a one-to-many relationship with the Answer model
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}], // Establishing a one-to-many relationship with the Tag model
  upVotes: {type: Number, default: 0, ref: 'User'},
  downVotes: {type: Number, default: 0, ref: 'User'},
  viewers: {type: Number, default: 0}
})

const Question = models.Question || model('Question', QuestionSchema)

export default Question