import {Document, model, models, Schema} from 'mongoose'

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string; // Make it optional as it depends on the login method
  bio?: string; // Optional field
  picture: string; // Optional field
  location?: string; // Optional field
  portfolio?: string; // Optional field
  reputation?: number; // Optional field
  saved: Schema.Types.ObjectId[]
  createdAt: Date;
}

const UserSchema = new Schema({
  clerkId: {type: String, required: true}, // ID coming from Clerk
  name: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true}, // This is required for users using email login
  password: {type: String}, // This can be optional for users using Google auth or other external authentication methods
  bio: {type: String}, // This can be optional, not all users may want to provide a bio
  picture: {type: String, required: true}, // This can be optional
  location: {type: String}, // This can be optional, as not everyone may want to share their location
  portfolio: {type: String}, // This can be optional, as not everyone may have a portfolio website
  reputation: {type: Number}, // This is optional and can be used for gamification
  saved: [{type: Schema.Types.ObjectId, ref: 'Question'}],
  createdAt: {type: Date, default: Date.now}
})

const User = models.User || model('User', UserSchema)

export default User