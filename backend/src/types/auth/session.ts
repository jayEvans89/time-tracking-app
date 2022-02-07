
import { Document } from 'mongoose'

/**
 * The session for a particular user
 */
export interface Session extends Document {
  /** The session token */
  token: string;

  /** The sessions expiry */
  expiry: Date;

  /** The id of the user that the session belongs to */
  userId: string;

  /** The id of the company the user belongs to */
  companyId: string
}

export interface SessionValidation {
  /** Whether the session if valid */
  valid: boolean

  /** A message stating the reseaon for being valid or not */
  message: string
}
