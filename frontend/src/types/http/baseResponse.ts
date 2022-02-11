
export interface BaseResponse {
  /**
   * Response status
   */
  status: string;

  /**
   * Response message
   */
  message: string;

  /**
   * New session token
   */
  token?: string;
}
