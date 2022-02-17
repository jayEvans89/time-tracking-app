import { BaseResponse } from '../http/baseResponse'

export interface SessionResponse extends BaseResponse {
  /** The id of the logged in user */
  userId: string;
}
