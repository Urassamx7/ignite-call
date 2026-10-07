import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { httpResponse } from '@/utils/http-response'

interface Props {
	params: Promise<{ username: string }>
}

export async function GET(req: NextRequest, { params }: Props) {
	if (req.method !== 'GET') {
		return Response.json(null, { status: 405 })
	}

	const { searchParams } = new URL(req.url)

	const { username } = await params
	const year = searchParams.get('year')
	const month = searchParams.get('month')

	if (!year || !month) {
		return httpResponse({ message: 'year or month not specified ' }, 400)
	}

	const user = await prisma.user.findUnique({
		where: { username },
	})

	if (!user) {
		return httpResponse({ message: 'User does not exist' }, 400)
	}

	const availableWeekDays = await prisma.userTimeInterval.findMany({
		select: { weekDay: true },
		where: {
			userId: user.id,
		},
	})

	const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
		return !availableWeekDays.some(
			(availableWeekDay) => availableWeekDay.weekDay === weekDay
		)
	})

	return httpResponse({ blockedWeekDays })
}
