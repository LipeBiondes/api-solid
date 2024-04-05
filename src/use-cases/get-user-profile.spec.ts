import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { hash } from 'bcryptjs'
import { GetUserProfilerUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfilerUseCase

describe('shold be able to get user profile', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfilerUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('12345678', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
