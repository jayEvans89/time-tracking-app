import { Request, Response } from 'express'
import { Client } from '@/types/client/client'
import { ClientModel } from '../../models/client/client.model'

export default class ClientController {
  /**
   * Creates a new client
   * @param req 
   * @param res 
   */
  async createClient(req: Request, res: Response) {
    const body = req.body as Client
    const client: Client = new ClientModel({
      name: body.name,
      address: body.address,
      description: body.description,
      contacts: body.contacts,
      userId: body.userId
    })

    const newClient = await ClientModel.create(client)
    res.status(200).send({
      status: 'success',
      message: 'Client created',
      data: newClient
    })
  }

  // Update client
  updateClient(req: Request, res: Response) {
    const body = req.body as Client
    const client: Client = new ClientModel({
      name: body.name,
      address: body.address,
      description: body.description
    })
  }
  
  /**
   * Deletes a client
   * @param req 
   * @param res 
   */
  deleteClient(req: Request, res: Response) {
    const id = req.params.id

    ClientModel.findByIdAndDelete(id, (err, result) => {
      if (err) {
        res.status(404).send({
          status: 'error',
          message: 'The client could not be deleted'
        })
      } else {
        res.status(200).send({
          status: 'success',
          message: 'The client was successfully deleted',
          data: result
        })
      }
    })
  }
  
  /**
   * Gets a specific client
   * @param req 
   * @param res 
   */
  async getClient(req: Request, res: Response) {
    const id = req.params.id
    await ClientModel.findById(id, (err, client) => {
      if (err) {
        res.status(404).send({
          status: 'error',
          message: 'Client not found'
        })
      } else {
        res.status(200).send({
          status: 'success',
          message: 'Found client with id: ' + id,
          data: client
        })
      }
    })
  }
  
  /**
   * Gets all the clients and all their data
   * @param req 
   * @param res 
   */
  async getAllFull(req: Request, res: Response) {
    const id = req.params.id
    const clients = await ClientModel.find({ userId: id })
    res.status(200).send({
      status: 'success',
      message: 'Got all clients',
      data: clients
    })
  }

  /**
   * Gets all the clients names
   * @param req 
   * @param res 
   */
  async getAllNames(req: Request, res: Response) {
    const id = req.params.id
    const clients = await ClientModel.find({ userId: id }, { name: 1, _id: 1 })
    res.status(200).send({
      status: 'success',
      message: 'Got all clients',
      data: clients
    })
  }

  // Below needs to be in it's own class
  // Create contact
  // Update contact
  // Delete contact
}
