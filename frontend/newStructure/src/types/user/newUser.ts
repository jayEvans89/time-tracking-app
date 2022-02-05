import { BaseResponse } from '../http/baseResponse'

export interface NewUser {
  /** Users first name */
  firstName: string;

  /** Users last name */
  lastName: string;

  /** Users email address */
  email: string

  /** The users password */
  password: string;
}

export interface UserCreationResponse extends BaseResponse {
  /** Returns the new users ID */
  data: string
}
