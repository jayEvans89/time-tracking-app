
import { Document } from 'mongoose'

export interface User extends Document {
  /** First name of a user */
  first_name: string

  /** Last name of a user */
  last_name: string

  /** The users email address */
  email: string

  /** The users password */
  password: string
}
