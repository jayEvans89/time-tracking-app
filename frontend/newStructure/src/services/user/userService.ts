import http from '@/services/http'
import { BaseResponse } from '@/types/http/baseResponse'
import { NewUser, UserCreationResponse } from '@/types/user/newUser'

class UserService {
  async checkExists(email: string): Promise<BaseResponse> {
    const data = {
      email: email
    }
    const response = await http.post<BaseResponse>('/signup/checkExsits', data)
    return response.data
  }

  async newUser(data: NewUser): Promise<UserCreationResponse> {
    const response = await http.post<UserCreationResponse>('/signup/newUser', data)
    return response.data
  }
}

export default new UserService()
