import { BaseResponse } from '@/types/http/baseResponse'

export interface ClientAddress {
  /** Client 1st line of address */
  address1: string;

  /** Clients 2nd line of address */
  address2: string;

  /** Clients county */
  county: string;

  /** Clients town */
  town: string;

  /** Clients postcode */
  postcode: string;
}

export interface Client {
  /** Clients Address */
  address: ClientAddress;

  /** The id of the company the client belongs to */
  companyId: string;

  /** List of contacts for the client */
  contacts: Array<any>;

  /** The creation date of the client */
  createdAt: string;

  /** Description of the client */
  description: string;

  /** The name of the client */
  name: string;

  /** The date of the last update */
  updatedAt: string;

  __v: number;

  /** Id of the client */
  _id: string;
}

export interface ClientNames {
  name: string;
  id: string;
}

export interface ClientNamesResponse extends BaseResponse {
  data: Array<ClientNames>;
}

export interface ClientDetailsResponse extends BaseResponse {
  data: Client;
}

export interface ClientInfo {
  name: string;
}
