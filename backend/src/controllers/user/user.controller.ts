import { Request, Response } from 'express'
import { User } from '../../types/user/user'
import { UserModel } from '../../models/user/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class UserController {

  /**
   * Get a specific user
   * @param req 
   * @param res 
   */
  async getUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id
    const user = await UserModel.findById(userId, (err, user) => {
      if (err) {
        res.status(404).send({
          status: 'error',
          message: 'user not found'
        })
      } else {
        res.status(200).send({
          status: 'success',
          message: 'found user with id ' + userId,
          data: user
        })
      }
    })
    console.log('user: ', user)
  }

  /**
   * Get all users
   * @param req 
   * @param res 
   */
  async getAllUsers(res: Response): Promise<void> {
    const users = (await UserModel.find())
    res.status(200).send({
      status: 'success',
      message: 'got all users',
      data: users,
      token: res.locals.token
    })
  }

  /**
   * Create a user
   * @param req 
   * @param res 
   */
  async createUser(newUser: User): Promise<CreateUserResponse> {
    const body = newUser

    const user: User = new UserModel({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: body.password
    })

    // Chceck user already signed up via email
    const userExists = await UserModel.findOne({ email: user.email })

    if (userExists) {
      const response = {
        status: 'error',
        message: 'A user with email already exists, please sign in',
      }
      return response
    }

    // Hash the password
    const saltRounds = 10
    user.password = await bcrypt.hash(body.password, saltRounds)
    await user.save()

    // Create the user
    const userData = await UserModel.create(user)

    const response = {
      status: 'success',
      message: 'User created',
      data: userData
    }
    return response
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const body = req.body as User
    const id = req.body._id

    await UserModel.findByIdAndUpdate({ _id: id }, {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email
    },
      {
        new: true,
        select: "first_name last_name username"
      }, (err, result) => {
        if (err) {
          res.status(404).send({
            status: 'error',
            message: 'The user could not be updated'
          })
        } else {

          const updatedUser = result
          delete updatedUser.password

          console.log(updatedUser)

          res.status(200).send({
            status: 'success',
            message: 'The user was updated',
            data: updatedUser
          })
        }
      })
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const id = req.body._id

    await UserModel.findOneAndDelete({ _id: id }, (err, result) => {
      if (err) {
        res.status(404).send({
          status: 'error',
          message: 'The user could not be deleted'
        })
      } else {
        res.status(200).send({
          status: 'success',
          message: 'The user was successfully deleted',
          data: result
        })
      }
    })
  }
}

export interface CreateUserResponse {
  status: string;
  message: string;
  data?: User;
}
