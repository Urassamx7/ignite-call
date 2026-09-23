import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../../auth/[...nextauth]/route'

const updateProfileSchema = z.object({
	bio: z.string(),
})

export const PUT = async (request: Request) => {
	if (request.method !== 'PUT') {
		return Response.json(null, {
			status: 405,
		})
	}
	const session = await getServerSession(authOptions)

	if (!session) {
		return Response.json(null, { status: 401 })
	}

	const body = await request.json()

	const { bio } = updateProfileSchema.parse(body)

	await prisma.user.update({
		where: { id: session.user.id },
		data: {
			bio,
		},
	})

	return new Response(null, { status: 204 })
}
