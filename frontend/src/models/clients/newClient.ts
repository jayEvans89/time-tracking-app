import BaseResponse from '@/models/request/defaultResponse'
import { Client, ClientAddress } from '@/models/clients/clientModal'

/**
 * New client
 */
export interface NewClient {
  /** Name of the company */
  name: string;

  /** Clients address */
  address: ClientAddress;

  /** Description of the client */
  description: string;

  /** List of contacts for the client */
  contacts: Array<ClientContactInfo>;

  /** The id of the company the client belongs to */
  companyId: number | string;
}

export interface NewClientResponse extends BaseResponse {
  data: Client;
}

/**
 * New client validation data
 */
export interface ClientValidationData {
  info: ClientValidationInfo;
  contact: ClientContactInfo;
}

export interface ClientValidationInfo extends ClientAddress {
  /** The name of the client */
  name: string;
}

export interface ClientContactInfo {

  /** First name of the contact */
  firstName: string;

  /** Last name of the contact */
  lastName: string;

  /** The position of the contact in the company */
  position: string;

  /** Clients mobile number */
  mobileNumber: number;

  /** Clients office number */
  officeNumber: number;
}
