
import express from "express";
import ClientController from '../../controllers/clients/client.controller';

export const client = express.Router()

const clientController = new ClientController()

// Get all Clients
client.get('/getAllFull/:id', (req, res) => {
  clientController.getAllFull(req, res)
})

// Get all client names
client.get('/getClientNames/:id', (req, res) => {
  clientController.getAllNames(req, res)
})

// Create a client
client.post('/create', (req, res) => {
  clientController.createClient(req, res)
})

// Delete a client
client.delete('/delete/:id', (req, res) => {
  clientController.deleteClient(req, res)
})

// // Update a user
// user.put('/update', (req, res) => {
//   userController.updateUser(req, res)
// })
