import { BaseResponse } from '../http/baseResponse'
import { User } from '../user/user'

export interface LoginData {
  /** The users email */
  email: string;

  /** The users password */
  password: string;
}

export interface LoginResponse extends BaseResponse {
  data: User;
}
