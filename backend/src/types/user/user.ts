
import { Document } from 'mongoose'

export interface User extends Document {
  /** First name of a user */
  firstName: string

  /** Last name of a user */
  lastName: string

  /** The users email address */
  email: string

  /** The users password */
  password: string
}
