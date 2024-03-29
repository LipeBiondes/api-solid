import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '12345678'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '12345678'
    })
    const isPassowrdHashed = await compare('12345678', user.password_hash)

    expect(isPassowrdHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'jonhdoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '12345678'
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
