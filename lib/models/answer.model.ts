import {Document, model, models, Schema} from 'mongoose'

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId; // Reference to the User model
  question: Schema.Types.ObjectId; // Reference to the Question model
  content: string;
  upVotes: Schema.Types.ObjectId[]; // Array of User IDs who up voted the answer
  downVotes: Schema.Types.ObjectId[]; // Array of User IDs who down voted the answer
}

const answerSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // Reference to the User model
  question: {type: Schema.Types.ObjectId, ref: 'Question', required: true}, // Reference to the Question model
  content: {type: String, required: true},
  upVotes: [{type: Schema.Types.ObjectId, ref: 'User'}], // Array of User IDs who up voted the answer
  downVotes: [{type: Schema.Types.ObjectId, ref: 'User'}] // Array of User IDs who down voted the answer
}, {
  timestamps: true
})

const Answer = models.Answer || model('Answer', answerSchema)

export default Answer