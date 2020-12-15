import { Document } from 'mongoose'

export interface Company extends Document {
  name: string;
  address: any;
  team: Array<number>;
  subscription: string;
}
