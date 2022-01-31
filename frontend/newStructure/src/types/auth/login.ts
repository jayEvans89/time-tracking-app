import { BaseResponse } from '../http/baseResponse'

export interface LoginData {
  /** The users email */
  email: string;

  /** The users password */
  password: string;
}

export interface LoginResponse extends BaseResponse {
  data?: object; // TODO: Add correct type
}
