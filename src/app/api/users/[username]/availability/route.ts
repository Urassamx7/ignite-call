import dayjs from 'dayjs'
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
	const date = searchParams.get('date')

	if (!date) {
		return httpResponse({ message: 'Date not provided ' }, 400)
	}

	const user = await prisma.user.findUnique({
		where: { username },
	})

	if (!user) {
		return httpResponse({ message: 'User does not exist' }, 400)
	}

	const referenceDate = dayjs(String(date))

	const isPastDate = referenceDate.endOf('day').isBefore(new Date())

	if (isPastDate) {
		return httpResponse({ possibleTimes: [], availableTimes: [] })
	}

	// Time interval
	const userAvailabilty = await prisma.userTimeInterval.findFirst({
		where: {
			userId: user.id,
			weekDay: referenceDate.get('day'),
		},
	})

	if (!userAvailabilty) {
		return httpResponse({ possibleTimes: [], availableTimes: [] })
	}

	const { timeStartInMinutes, timeEndInMinutes } = userAvailabilty

	const startHour = timeStartInMinutes / 60
	const EndHour = timeEndInMinutes / 60

	const possibleTimes = Array.from({ length: EndHour - startHour }).map(
		(_, index) => {
			return startHour + index
		}
	)

	const blockedTimes = await prisma.scheduling.findMany({
		select: { date: true },
		where: {
			userId: user.id,
			date: {
				gte: referenceDate.set('hour', startHour).toDate(),
				lte: referenceDate.set('hour', EndHour).toDate(),
			},
		},
	})

	const availableTimes = possibleTimes.filter((time) => {
		return !blockedTimes.some(
			(blockedTime) => blockedTime.date.getHours() === time
		)
	})

	return httpResponse({ possibleTimes, availableTimes })
}
