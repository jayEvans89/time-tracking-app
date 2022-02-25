import { BaseResponse } from '../http/baseResponse'
import { Client, ClientAddress } from './clientModel'

export interface NewClientInfo extends ClientAddress{
  /** The name of the client */
  clientName: string;
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
  mobileNumber: string;

  /** Clients office number */
  officeNumber: string;
}

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

  /** The id of the user the client belongs to */
  userId: number | string;
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
