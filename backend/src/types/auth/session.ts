
import { Document } from 'mongoose'

export interface ISession extends Document {
  token: string;
  expiry: Date;
  userId: string;
}
