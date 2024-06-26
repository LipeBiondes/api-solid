import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'

import { InvalidCrendetialsErros } from './erros/invalid-credentials-error'

import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('12345678', 6)
    })

    const { user } = await sut.execute({
      email: 'jonhdoe@example.com',
      password: '12345678'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'jonhdoe@example.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(InvalidCrendetialsErros)
  })

  it('should be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('12345678', 6)
    })

    expect(() =>
      sut.execute({
        email: 'jonhdoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCrendetialsErros)
  })
})
