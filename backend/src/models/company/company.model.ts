import { Company } from '@/types/company/company'
import { Schema } from 'mongoose'
import * as Mongoose from "mongoose";


const companySchema: Schema = new Schema ({
  name: {
    type: String,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  team: {
    type: Array
  },
  ownerId: {
    type: String,
    required: true
  },
  subscription: {
    type: String
  },
},
{
  timestamps: true
})

export const CompanyModel = Mongoose.model<Company>(
  'company',
  companySchema
)
