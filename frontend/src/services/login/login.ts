import { LoginValidationData } from '@/models/user/login'
import http from '../http'

class LoginService {
  async login(data: LoginValidationData) {
    const response = await http.post('/login', data)
    return response.data
  }

  async checkSession() {
    const response = await http.post('/login/auth')
    return response.data
  }

  async logout() {
    const response = await http.post('/logout')
    return response.data
  }
}

export default new LoginService()
