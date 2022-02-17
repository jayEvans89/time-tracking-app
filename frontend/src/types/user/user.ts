
export interface User {
  /** The date the user was created */
  createdAt: string;

  /** The users email */
  email: string;

  /** The user first name */
  firstName: string;

  /** The users last name */
  lastName: string;

  /** The last date the user was updated */
  updatedAt: string;

  /** ??? Mongoose thing */
  _v: number;

  /** The users ID */
  _id: string
}
