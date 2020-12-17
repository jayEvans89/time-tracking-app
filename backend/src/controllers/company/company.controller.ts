import { Request, Response } from 'express'
import { Company } from '@/types/company/company'
import { CompanyModel } from '../../models/company/company.model'

export default class CompanyController {
  /**
   * Create a new company
   * @param req 
   * @param res 
   * @param userId The id of the default user 
   */
  async createCompany(company: Company, userId: string) {
    const companyData: Company = new CompanyModel({
      name: company.name,
      address: company.address,
      ownerId: userId
    })

    const newCompany = await CompanyModel.create(companyData)
    const response = {
      status: 'success',
      message: 'Company Created',
      data: newCompany
    }
    return response
  }

  /**
   * Update a company
   * @param req 
   * @param res 
   */
  async updateCompany(req: Request, res: Response) {
    const body = req.body as Company
    const id = req.body._id

    await CompanyModel.findByIdAndUpdate({ _id: id }, {
      name: body.name,
      address: body.address,
    }, (err, result) => {
      if (err) {
        res.status(404).send({
          status: 'error',
          message: 'The user could not be updated'
        })
      } else {
        res.status(200).send({
          status: 'success',
          message: 'Company updated',
          data: result
        })
      }
    })
  }
}
