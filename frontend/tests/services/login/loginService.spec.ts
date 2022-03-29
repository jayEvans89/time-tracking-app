import http from '@/services/http'
import loginService from '@/services/login/loginService'
import { flushPromises } from '@vue/test-utils'
import { vi } from 'vitest'

const mock = vi.spyOn(http, 'post')

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

describe('Login service', () => {
  it('should call the login endpoint', async () => {
    const loginResponseData = {
      status: 'success'
    }
    const loginData = {
      email: 'test@test.com',
      password: '123'
    }

    mock.mockResolvedValue(createResponse(loginResponseData))
    const res = await loginService.login(loginData)
    await flushPromises()
    expect(res).toEqual(loginResponseData)
  })

  it('should call the checkSession endpoint', async () => {
    const checkSessionResponse = {
      status: 'success',
      message: 'new token',
      token: '1234'
    }

    mock.mockResolvedValue(createResponse(checkSessionResponse))
    const res = await loginService.checkSession()
    await flushPromises()
    expect(res).toEqual(checkSessionResponse)
  })

  it('should call the logout endpoint', async () => {
    const logoutResponse = {
      status: 'Success',
      message: 'Session removed. Logout'
    }

    mock.mockResolvedValue(createResponse(logoutResponse))
    const res = await loginService.logout()
    await flushPromises()
    expect(res).toEqual(logoutResponse)
  })
})
