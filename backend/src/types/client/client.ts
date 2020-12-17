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

  /** The id of the company it belongs to */
  companyId: string;
}

export interface ClientAddress {
  /** Address line 1 */
  address_line_1: string;

  /** Address line 2 */
  addres_line_2: string;

  /** The town or city */
  town_city: string;

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
  mobile_number: number;

  /** Contacts office number */
  office_number: string;
}