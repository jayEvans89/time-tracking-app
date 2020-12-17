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
}

/**
 * The companies address
 */
export interface CompanyAddress {
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
