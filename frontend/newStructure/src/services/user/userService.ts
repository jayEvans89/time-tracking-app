// import DefaultResponse from '@/models/request/defaultResponse'
// import { NewUser } from '@/models/user/newUser'
// import http from '@/services/http'

// class UserService {
//   async checkExsists(email: string): Promise<DefaultResponse> {
//     const data = {
//       email: email
//     }
//     const response = await http.post('/signup/checkExsits', data)
//     return response.data
//   }

//   async newUser(data: NewUser) {
//     const response = await http.post('/signup/newUser', data)
//     return response.data
//   }
// }

// export default new UserService()
