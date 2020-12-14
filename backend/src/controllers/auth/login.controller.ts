import { Request, Response } from 'express'
import { User } from '../../types/user/user'
import { UserModel } from '../../models/user/user.model'
import SessionController from './session.controller'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Session } from '../../types/auth/session'

export default class LoginController {
  public sessionController = new SessionController()

  async login(req: Request, res: Response): Promise<void> {
    const body = req.body as User
    const email = body.email
    const password = body.password

    const userExists = await UserModel.findOne({ email: email})

    if (userExists) {
      const saltRounds = 10
      const hashPassword = await bcrypt.hash(body.password, saltRounds)
        console.log('password: ', hashPassword)
        console.log('stored password: ', userExists.password)
      if (await bcrypt.compare(password, userExists.password)) {
        try {
          await this.authenticateUser(userExists, res)
        } catch (error) {
          console.log(error)
        }
      } else {
        res.status(201).send({
          status: 'Password Error',
          message: 'Incorrect Password'
        })
      }
    } else {
      res.status(201).send({
        status: 'User Error',
        message: 'No user found'
      })
    }
  }

  async authenticateUser(user: User, res: Response) {
    let session: Session
    let token: string

    try {
      session = await this.sessionController.createSession(user) 
    } catch (error) {
      console.log(error)
    }

    try {
      token = await this.sessionController.createJWT(user.id)
    } catch (error) {
      console.log(error)
    }

    return res.cookie('refreshToken', session,  {
      expires: session.expiry,
      httpOnly: true,
      secure: false,
    }).status(201).send({
      status: 'success',
      message: 'Login accepted',
      data: user,
      token: token
    })
  }

  async logout(req: Request, res: Response) {
    const cookie: Session = req.cookies.refreshToken
    const sessionId = cookie._id
    await this.sessionController.removeSession(sessionId)
    return res.status(200).send({
      status: 'Success',
      message: 'Session removed. Logout'
    })
  }
}