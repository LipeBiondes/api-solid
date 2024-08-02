import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register-user'
import { compare } from 'bcryptjs'

type User = {
  id: string
  email: string
  name: string
  password_hash: string
  created_at: Date
}

describe('Register User Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUserCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },
      async createUser(data): Promise<User> {
        return {
          id: 'user-1',
          created_at: new Date(),
          email: data.email,
          name: data.name,
          password_hash: data.password_hash
        }
      }
    })
    const { user } = await registerUserCase.execute({
      email: 'JhonDoe@email.com',
      name: 'Jhon Doe',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
