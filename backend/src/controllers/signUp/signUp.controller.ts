import UserController from '../../controllers/user/user.controller'
import SessionController from '../../controllers/auth/session.controller'
import { User } from '../../types/user/user'
import { Request, Response } from 'express'
import { UserModel } from '../../models/user/user.model'

const userController = new UserController()
const sessionController = new SessionController()

export default class SignupController {
  /**
   * Create a new user
   * @param req 
   * @param res 
   */
  async createNewUser(req: Request, res: Response) {
    const user = req.body as User
  
    const userResponse = await userController.createUser(user)

    if (userResponse.status === 'success') {
      const session = await sessionController.createSession(user)

      if (session !== false) {
        const jwt = await sessionController.createJWT(user._id)
  
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
  async checkUserExists(req: Request, res: Response) {
    const email = req.body.email
    const userExits = await UserModel.findOne({ email: email })
    if (!userExits) {
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
