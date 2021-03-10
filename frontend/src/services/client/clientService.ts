import { ClientNamesResponse, ClientDetailsResponse } from '@/models/clients/clientModal'
import { NewClient, NewClientResponse } from '@/models/clients/newClient'
import http from '@/services/http'
import store from '@/store'

class ClientService {
  async getClientNames(): Promise<ClientNamesResponse> {
    const companyId = store.state.companyId
    const response = await http.get(`client/getClientNames/${companyId}`)
    return response.data
  }

  async createClient(data: NewClient): Promise<NewClientResponse> {
    const response = await http.post('client/create', data)
    return response.data
  }

  async getClient(id: string): Promise<ClientDetailsResponse> {
    const res = await http.get(`client/getClient/${id}`)
    return res.data
  }
}

export default new ClientService()
