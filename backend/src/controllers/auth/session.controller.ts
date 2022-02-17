import bcrypt from 'bcrypt'
import randomString from 'randomstring'
import { Session, SessionValidation } from '../../types/auth/session'
import { SessionModel } from '../../models/auth/refreshToken'
import { User } from '../../types/user/user'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

export default class SessionController {

  /**
   * Creates a new session
   * @param user The user to create a session for
   */
  async createSession(user: User) {
    let token = randomString.generate({ length: 12 })
    token = await bcrypt.hash(token, 10)

    let date = new Date()
    const expiry = date.setDate(date.getDate() + 30)
    console.log(expiry)
    const refreshToken: Session = new SessionModel({
      token: token,
      expiry: expiry,
      userId: user.id
    })

    try {
      return await SessionModel.create(refreshToken)
    } catch (error) {
      console.log(error)
      return false
    }
  }

  /**
   * Validates a JWT
   * @param jwt The JWT to validate
   */
  async validateJWT(token: any): Promise<boolean> {
    const jwtToken = () => {
      return new Promise((resolve, reject) => {
        jwt.verify(token, 'randomString', (err, decoded) => {
          if (err) {
            reject(err)
          } else {
            resolve(decoded)
          }
        })
      })
    }

    return jwtToken().then((res: any) => {
      return res
    }).catch(() => {
      return false
    })
  }

  /**
   * Validates the session token
   * @param cookie Session Token
   */
  async validateRefreshToken(cookie: Session) {

    if (cookie === undefined) {
      return {
        valid: false,
        message: "No session cookie"
      }
    }

    const id = cookie._id
    const token = cookie.token
    const expiry = new Date(cookie.expiry)
    const currentDate = new Date()

    const session = await SessionModel.findById(id)

    if (!session) {
      return {
        valid: false,
        message: "Session doesn't exsits"
      }
    }
    if (token !== session.token) {
      await this.removeSession(id)
      return {
        valid: false,
        message: "Session token invalid"
      }
    } else {
      if (currentDate > expiry) {
        await this.removeSession(id)
        return {
          valid: false,
          message: "Session expired"
        }
      } else {
        return {
          valid: true,
          message: "Session exsits"
        }
      }
    }
  }

  /**
   * Removes a session from the database
   * @param id The session to remove
   */
  async removeSession(id: number) {
    return await SessionModel.deleteOne({ _id: id }, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  /**
   * Creates a new JWT
   * @param userId The user id to create a new JWT 
   */
  async createJWT(userId: string) {
    const payload = {
      user: {
        id: userId
      }
    }

    const jwtToken = () => {
      return new Promise((resolve, reject) => {
        jwt.sign(
          payload,
          "randomString", {
          expiresIn: '5min'
        }, (err, token) => {
          if (err) {
            reject(err)
          }

          resolve(token)
        })
      })
    }

    return jwtToken().then((token: string) => {
      return token
    }).catch(error => {
      return error
    })
  }

  /**
   * Validates the current session
   * @param req 
   * @param res 
   */
  async validateSession(req: Request, res: Response) {

    // Check JWT
    let bearer: Array<string>
    let bearerToken = ''
    let validToken = false

    if (req.headers.authorization) {
      bearer = req.headers.authorization.split(' ')
      bearerToken = bearer[1]
      if (bearer.length == 2) {
        try {
          validToken = await this.validateJWT(bearerToken)
        } catch (error) {
          console.log(error)
        }
      }
    }

    if (!validToken) {
      let validSession: SessionValidation

      try {
        validSession = await this.validateRefreshToken(req.cookies.refreshToken)
      } catch (error) {
        console.log(error)
      }

      if (!validSession.valid) {
        return {
          status: 'Session error',
          message: validSession.message
        }
      } else {
        let token = ''
        try {
          token = await this.createJWT(req.cookies.refreshToken.userId)
        } catch (error) {
          console.log(error)
        }

        return {
          status: 'success',
          message: 'New token authorized',
          token: token
        }
      }
    } else {
      return {
        status: 'success',
        message: 'Session authed'
      }
    }
  }
}
