import express from "express";
import SignupController from '../../controllers/signUp/signUp.controller'

export const signUp = express.Router()

const signupController = new SignupController()

/** 
 * Creates a new user and company
 */
signUp.post('/newUser', (req, res) => {
  signupController.createNewUser(req, res)
  // const user = JSON.parse(req.body.user)
  // const company = JSON.parse(req.body.company)
  // const test = {
  //     first_name: 'james',
  //     last_name: 'evans',
  //     email: 'james@cloudskyinc.com',
  //     password: 'test123'
  //   }

  // console.log(user)
  // // console.log(company)
  // // console.log(req.body.user)
  // // console.log(req.body.company)
  // res.send(user)
})

// Checks if a user already exsists in the database
signUp.post('/checkExsits', (req, res) => {
  signupController.checkUserExsists(req, res)
})

// {
//   first_name: 'james',
//   last_name: 'evans',
//   email: 'james@cloudskyinc.com',
//   password: 'test123'
// }
// const rest = {
//   name: 'CloudskyInc.',
//   address: {
//     address_line_1: '69 hill side',
//     address_line_2: 'kingsbury',
//   }
// }