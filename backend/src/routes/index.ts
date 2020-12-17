
import express, { NextFunction, Request, Response } from "express";
import { user } from './user/user'
import { login } from './login/login'
import { logout } from './login/logout'
import { client } from './client/client'
import { signUp } from './signUp/signUp'
import AuthMiddleware from '../middleware/auth'

export const router = express.Router()

const auth = new AuthMiddleware()

router.get('/', (req: Request, res: Response) => {
  res.send('hello route')
})

router.get('/test', (req, res) => {
  res.send('test route is working!')
})

// Sign up
router.use('/signup', signUp)

// Login Route
router.use('/login', login)

// Logout
router.use('/logout', logout)

// User Routes
router.use('/user', (req: Request, res: Response, next: NextFunction) => {
  auth.checkSession(req, res, next)
}, (req, res, next) => {
  user(req, res, next)
})

// Client
router.use('/client', client)
