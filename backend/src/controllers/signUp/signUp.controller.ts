import CompanyController from '../../controllers/company/company.controller'
import UserController from '../../controllers/user/user.controller'
import SessionController from '../../controllers/auth/session.controller'
import { User } from '../../types/user/user'
import { Company } from '../../types/company/company'
import { Request, Response } from 'express'
import { UserModel } from '../../models/user/user.model'

const companyController  = new CompanyController()
const userController = new UserController()
const sessionController = new SessionController()

export default class SignupController {
  /**
   * Create a new user and company
   * @param req 
   * @param res 
   */
  async createNewUser(req: Request, res: Response) {
    const user = req.body.user as User
    // const company = req.body.company as Company
  
    const userResponse = await userController.createUser(user)

    if (userResponse.status === 'success') {
      // const newCompany = await companyController.createCompany(company, userResponse.data._id)

      const updatedUser = await UserModel.findOneAndUpdate({ _id: userResponse.data._id }, { company_id: newCompany.data._id }, { new: true })

      const session = await sessionController.createSession(updatedUser)

      if (session !== false) {
        const jwt = await sessionController.createJWT(updatedUser._id, updatedUser.company_id)
  
        return res.cookie('refreshToken', session,  {
          expires: session.expiry,
          httpOnly: true,
          secure: false,
        }).status(201).send({
          status: 'success',
          message: 'User created, welcome!',
          data: userResponse.data._id,
          token: jwt
        })
      }
    }
  }

    /**
   * Check whether a user already exsists in the database
   * @param req 
   * @param res 
   */
  async checkUserExsists(req: Request, res: Response) {
    const email = req.body.email
    const userExsits = await UserModel.findOne({ email: email })
    if (!userExsits) {
      res.status(200).send({
        status: 'success',
        message: "User doesn't exists"
      })
    } else {
      res.status(200).send({
        status: 'error',
        message: "User already exists"
      })
    }
  }
}
