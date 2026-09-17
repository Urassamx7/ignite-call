'use client'

import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { ClaimUsernameForm } from '../components/claim-username-form'
import { Container, Hero, Preview } from '../styles/style'

export const HomeView = () => {
	return (
		<Container>
			<Hero>
				<Heading as='h1' size='4xl'>
					Agendamento descomplicado
				</Heading>
				<Text size='xl'>
					Conecte seu calendario e permita que as pessoas marquem
					agendamentos
				</Text>
				<ClaimUsernameForm />
			</Hero>
			<Preview>
				<Image
					src='/assets/app-preview.png'
					alt='preview'
					width={400}
					height={400}
					quality={100}
					priority
					style={{
						width: 'auto',
					}}
				/>
			</Preview>
		</Container>
	)
}
