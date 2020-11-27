import express from "express";
import LoginController from '../../controllers/auth/login.controller'
import SessionController from '../../controllers/auth/session.controller'

export const logout = express.Router()

const loginController = new LoginController()

logout.post('/', (req, res) => {
  loginController.logout(req, res)
})
