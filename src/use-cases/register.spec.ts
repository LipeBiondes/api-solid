import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '12345678'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '12345678'
    })
    const isPassowrdHashed = await compare('12345678', user.password_hash)

    expect(isPassowrdHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'jonhdoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '12345678'
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
