'use client'

import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from '../styles'

interface ScheduleUserProps {
	user: {
		name: string
		bio: string | null
		avatarUrl: string | null
	}
}

export const ScheduleUserView = ({ user }: ScheduleUserProps) => {
	return (
		<Container>
			<UserHeader>
				<Avatar
					src={user.avatarUrl ?? ''}
					alt={user.name}
					referrerPolicy='no-referrer'
				/>
				<Heading>{user.name}</Heading>
				<Text>{user.bio}</Text>
			</UserHeader>
		</Container>
	)
}
