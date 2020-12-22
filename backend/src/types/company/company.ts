import { Document } from 'mongoose'

/**
 * A company
 */
export interface Company extends Document {
  /** Company name */
  name: string;

  /** Company address */
  address: CompanyAddress;

  /** Company team ids */
  team: Array<string>;

  /** Company owner */
  ownerId: string;

  /** The current subscription */
  subscription: string;

  /** Companies contact number */
  contact_number: number;

  /** Companies contact email */
  contact_email: string;

  /** The type of business that company works in */
  busniess_type: string;
}

/**
 * The companies address
 */
export interface CompanyAddress {
  /** Address line 1 */
  address: string;

  /** The town or city */
  town_city: string;

  /** The county */
  county: string;

  /** The postcode */
  postcode: string;
}
