import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import SessionController from '../controllers/auth/session.controller'

export default class AuthMiddleware {

  public sessionController = new SessionController()

  async checkSession(req: Request, res: Response, next: NextFunction) {
    this.sessionController.validateSession(req, res).then((response) => {
      if (response.status === 'Success') {
        res.locals.token = response.token
        next()
      } else {
        return res.status(403).send({
          response
        })
      }
    }).catch(error => {
      return res.status(403).send({
        status: 'Error',
        message: error
      })
    })
  }
}
