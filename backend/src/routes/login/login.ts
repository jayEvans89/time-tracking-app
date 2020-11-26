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
    if (response.status === 'Success') {
      return res.status(201).send({
        response
      })
    }

    if (response.status === 'Success') {
      return res.status(201).send({
        response
      })
    } else {
      return res.status(201).send({
        response
      })
    }
  }).catch(error => {
    return res.status(403).send({
      status: 'Error',
      message: error
    })
  })
})
