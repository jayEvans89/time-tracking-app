import DefaultResponse from '@/models/request/defaultResponse'

export interface CheckSession extends DefaultResponse {
  token: string;
  response: {
    userId: string;
    companyId: string;
  };
}
