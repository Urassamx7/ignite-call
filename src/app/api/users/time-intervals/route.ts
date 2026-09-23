import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../../auth/[...nextauth]/route'

const timeIntervals = z.object({
	intervals: z.array(
		z.object({
			weekDay: z.number(),
			startTimeInMinutes: z.number(),
			endTimeInMinutes: z.number(),
		})
	),
})

export async function GET() {
	const session = await getServerSession(authOptions)

	return Response.json({
		session,
	})
}
export async function POST(request: Request) {
	if (request.method !== 'POST') {
		return Response.json(null, { status: 405 })
	}

	const session = await getServerSession(authOptions)

	if (!session) {
		return Response.json(null, { status: 401 })
	}

	const body = await request.json()
	const { intervals } = timeIntervals.parse(body)

	await Promise.all(
		intervals.map((interval) => {
			return prisma.userTimeInterval.create({
				data: {
					timeEndInMinutes: interval.endTimeInMinutes,
					timeStartInMinutes: interval.startTimeInMinutes,
					weekDay: interval.weekDay,
					userId: session.user?.id,
				},
			})
		})
	)

	return Response.json({ message: 'Intervals created!' }, { status: 201 })
}
