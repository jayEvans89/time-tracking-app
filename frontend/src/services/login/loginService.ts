import { SessionResponse } from '@/types/auth/auth'
import { LoginData, LoginResponse } from '@/types/auth/login'
import { BaseResponse } from '@/types/http/baseResponse'

import http from '../http'

class LoginService {
  async login(data: LoginData): Promise<LoginResponse> {
    const response = await http.post<LoginResponse>('/login', data)
    return response.data
  }

  async checkSession(): Promise<SessionResponse> {
    const res = await http.post<SessionResponse>('/login/auth')
    return res.data
  }

  async logout(): Promise<BaseResponse> {
    const response = await http.post<BaseResponse>('/logout')
    return response.data
  }
}

export default new LoginService()
