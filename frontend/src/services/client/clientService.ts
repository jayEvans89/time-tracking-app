import http from '@/services/http'
import { ClientDetailsResponse, ClientNamesResponse } from '@/types/client/clientModel'
import { NewClient, NewClientResponse } from '@/types/client/newClient'

class ClientService {
  async getClientNames(): Promise<ClientNamesResponse> {
    const companyId = ''
    const response = await http.get<ClientNamesResponse>(`client/getClientNames/${companyId}`)
    return response.data
  }

  async createClient(data: NewClient): Promise<NewClientResponse> {
    const response = await http.post<NewClientResponse>('client/create', data)
    return response.data
  }

  async getClient(id: string): Promise<ClientDetailsResponse> {
    const res = await http.get<ClientDetailsResponse>(`client/getClient/${id}`)
    return res.data
  }
}

export default new ClientService()
