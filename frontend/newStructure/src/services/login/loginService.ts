import { LoginData } from '@/types/auth/login'
import { BaseResponse } from '@/types/http/baseResponse'

import http from '../http'

export default class LoginService {
  async login(data: LoginData): Promise<BaseResponse> {
    const response = await http.post<BaseResponse>('/login', data)
    return response.data
  }

  async checkSession(): Promise<BaseResponse> {
    const res = await http.post<BaseResponse>('/login/auth')
    return res.data
  }

  async logout() {
    const response = await http.post('/logout')
    return response.data
  }
}
