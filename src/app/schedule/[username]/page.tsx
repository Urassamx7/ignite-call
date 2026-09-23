import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ScheduleUserView } from '@/modules/schedule/ui/views/schedule-user-view'

export const dynamic = 'force-dynamic'

interface PageProps {
	params: Promise<{ username: string }>
}

export default async function Page({ params }: PageProps) {
	const { username } = await params

	const user = await prisma.user.findUnique({
		where: { username },
		select: {
			name: true,
			bio: true,
			avatarUrl: true,
		},
	})

	if (!user) {
		notFound()
	}

	return <ScheduleUserView user={user} />
}
