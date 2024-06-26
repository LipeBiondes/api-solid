import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { InvalidCrendetialsErros } from '@/use-cases/erros/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCrendetialsErros) {
      return reply.status(400).send({
        message: error.message
      })
    }
    throw error
  }

  return reply.status(200).send()
}
