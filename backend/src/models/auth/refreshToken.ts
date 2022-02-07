import { Session } from '../../types/auth/session'
import { model, Schema } from 'mongoose'
import * as Mongoose from "mongoose";


const sessionSchema: Schema = new Schema ({
  token: {
    type: String,
    required: true
  },
  expiry: {
    type: Date,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  companyId: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

export const SessionModel = Mongoose.model<Session>(
  'refreshToken',
  sessionSchema
)
