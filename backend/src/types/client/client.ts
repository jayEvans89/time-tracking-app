import { Document } from 'mongoose'

export interface Client extends Document {
  /** The name of the client */
  name: string;

  /** Clients address */
  address: ClientAddress;

  /** A description of the clients business */
  description: string;

  /** The clients address */
  contacts: Array<ClientContact>;

  /** The id of the user it belongs to */
  userId: string;
}

export interface ClientAddress {
  /** Address line 1 */
  addressLine1: string;

  /** Address line 2 */
  addresLine2: string;

  /** The town or city */
  townCity: string;

  /** The county */
  county: string;

  /** The postcode */
  postcode: string;
}

export interface ClientContact {
  /** Name of the contact */
  name: string;

  /** Position of the contact */
  position: string;

  /** Contacts email */
  email: string;

  /** Contact mobile number */
  mobileNumber: number;

  /** Contacts office number */
  officeNumber: string;
}
