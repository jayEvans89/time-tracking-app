import { User } from '../../types/user/user'
import { model, Schema } from 'mongoose'
import * as Mongoose from "mongoose";


const userSchema: Schema = new Schema ({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
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
    required: true
  }
},
{
  timestamps: true
})

export const UserModel = Mongoose.model<User>(
  'user',
  userSchema
)
