
import express from "express";
import UserController from '../../controllers/user/user.controller';

export const user = express.Router()

const userController  = new UserController()

// Get all users
user.get('/getAll', (req, res) => {
  console.log('get all: ')
  userController.getAllUsers(res)
})

// Get a specific user
user.get('/get/:id', (req, res) => {
  userController.getUser(req, res)
})

// Create a user
user.post('/create', (req, res) => {
  userController.createUser(req, res)
})

// Update a user
user.put('/update', (req, res) => {
  userController.updateUser(req, res)
})

// Delete a user
user.delete('/delete', (req, res) => {
  userController.deleteUser(req, res)
})
