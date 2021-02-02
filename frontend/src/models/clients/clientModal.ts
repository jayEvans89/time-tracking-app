import DefaultResponse from '@/models/request/defaultResponse'

export interface ClientNames {
  name: string;
  id: string;
}

export interface ClientNamesResponse extends DefaultResponse {
  data: Array<ClientNames>;
}

export interface ClientInfo {
  name: string;
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

export interface ClientAddress {
  /** Client 1st line of address */
  addressLine1: string;

  /** Clients 2nd line of address */
  addressLine2: string;

  /** Clients county */
  county: string;

  /** Clients town */
  town: string;

  /** Clients postcode */
  postcode: string;
}
