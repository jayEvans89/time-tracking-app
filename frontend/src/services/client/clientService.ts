import { ClientNamesResponse } from '@/models/clients/clientModal'
import http from '@/services/http'
import store from '@/store'

class ClientService {
  async getClientNames(): Promise<ClientNamesResponse> {
    const companyId = store.state.companyId
    const response = await http.get(`client/getClientNames/${companyId}`)
    return response.data
  }
}

export default new ClientService()
