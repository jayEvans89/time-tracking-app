import DefaultResponse from '@/models/request/defaultResponse'

export interface ClientNames {
  name: string;
  id: string;
}

export interface ClientNamesResponse extends DefaultResponse {
  data: Array<ClientNames>;
}
