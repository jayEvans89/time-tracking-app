import http from '@/services/http'
import userService from '@/services/user/userService'
import { flushPromises } from '@vue/test-utils'

const mock = jest.spyOn(http, 'post')

const createResponse = (data: any) => {
  return {
    data: {
      ...data
    },
    status: 200,
    statusText: '',
    headers: {},
    config: {}
  }
}

describe('User service', () => {
  it('should call the check user exists method', async () => {
    const checkUserResponseData = {
      status: 'success'
    }

    mock.mockResolvedValue(createResponse(checkUserResponseData))
    const res = await userService.checkExists('test@test.com')
    await flushPromises()
    expect(res).toEqual(checkUserResponseData)
  })

  it('should call the new user method', async () => {
    const userCreationResponse = {
      data: 'userId'
    }

    const newUser = {
      firstName: 'first',
      lastName: 'last',
      email: 'test@test.com',
      password: 'test'
    }

    mock.mockResolvedValue(createResponse(userCreationResponse))
    const res = await userService.newUser(newUser)
    await flushPromises()
    expect(res).toEqual(userCreationResponse)
  })
})
