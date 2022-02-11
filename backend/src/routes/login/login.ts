import express from "express";
import LoginController from '../../controllers/auth/login.controller'
import SessionController from '../../controllers/auth/session.controller'

export const login = express.Router()

const loginController = new LoginController()
const sessionController = new SessionController()

login.post('/', (req, res) => {
  loginController.login(req, res)
})

login.post('/auth', (req, res) => {
  sessionController.validateSession(req, res).then((response) => {
    if (response.status === 'success') {
      return res.status(200).send({
        status: response.status,
        message: response.message,
        token: response.token,
        response: {
          userId: req.cookies.refreshToken.userId,
          companyId: req.cookies.refreshToken.companyId
        }
      })
    } else {
      return res.status(401).send({
        status: response.status,
        message: response.message,
        token: response.token
      })
    }
  }).catch(error => {
    return res.status(403).send({
      status: 'Error',
      message: error
    })
  })
})
