import { User } from '../../types/user/user'
import { model, Schema } from 'mongoose'
import * as Mongoose from "mongoose";


const userSchema: Schema = new Schema ({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  company_id: {
    type: String,
    required: false
  }
},
{
  timestamps: true
})

export const UserModel = Mongoose.model<User>(
  'user',
  userSchema
)
