import { UsersRepository } from '@/repositories/users-repository'

import { User } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface GetUserProfilerUseCaseRequest {
  userId: string
}

interface GetUserProfilerCaseResponse {
  user: User
}

export class GetUserProfilerUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId
  }: GetUserProfilerUseCaseRequest): Promise<GetUserProfilerCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user
    }
  }
}
