import { Client, ClientAddress } from '../../types/client/client'
import { model, Schema } from 'mongoose'
import * as Mongoose from "mongoose";


const clientSchema: Schema = new Schema ({
  name: {
    type: String,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  description: {
    type: String
  },
  companyId: {
    type: String,
    required: true
  },
  contacts: {
    type: Array
  }
},
{
  timestamps: true
})

export const ClientModel = Mongoose.model<Client>(
  'client',
  clientSchema
)
