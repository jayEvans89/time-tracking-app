import { AxiosPromise } from 'axios'
import http from '../http'

class LoginService {
  async login(data: any) {
    const response = await http.post('/login', data)
    return response.data
  }

  async checkSession() {
    const response = await http.post('/login/auth')
    return response.data
  }
}

export default new LoginService()
