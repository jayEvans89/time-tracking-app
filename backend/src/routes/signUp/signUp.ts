import express from "express";
import SignupController from '../../controllers/signUp/signUp.controller'

export const signUp = express.Router()

const signupController = new SignupController()

/** 
 * Creates a new user
 */
signUp.post('/newUser', (req, res) => {
  console.log(req)
  signupController.createNewUser(req, res)
})

// Checks if a user already exists in the database
signUp.post('/checkExits', (req, res) => {
  signupController.checkUserExists(req, res)
})
