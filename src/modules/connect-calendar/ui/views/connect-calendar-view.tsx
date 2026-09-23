'use client'

import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '@/modules/register/ui/styles/styles'
import { AuthError, ConnectBox, ConnectItem } from '../styles/styles'

export const ConnectCalendarView = ({ hasError }: { hasError?: boolean }) => {
	const session = useSession()
	const router = useRouter()
	async function handleConnectCalendar() {
		await signIn('google')
	}

	const isSignedIn = session.status === 'authenticated'

	function handleNavigateToNextStep() {
		router.push('/register/time-intervals')
	}

	return (
		<Container>
			<Header>
				<Heading as='strong'>Conecte a sua agenda!</Heading>
				<Text>
					Conecte o seu calendário para verificar automaticamente as
					horas ocupadas e os novos eventos à medida em que são
					agendados.
				</Text>
				<MultiStep size={4} currentStep={2} />
			</Header>
			<ConnectBox>
				<ConnectItem>
					<Text>Google Calendar</Text>
					{isSignedIn ? (
						<Button size='sm' disabled>
							Conectado <Check />
						</Button>
					) : (
						<Button
							type='submit'
							variant='secondary'
							size='sm'
							onClick={handleConnectCalendar}
						>
							Conectar <ArrowRight />
						</Button>
					)}
				</ConnectItem>
				{hasError && (
					<AuthError size='sm'>
						Falha ao se conectar ao Goolge. Verifique se deu
						permissões de acesso ao Google Calendar.
					</AuthError>
				)}
				<Button
					type='submit'
					disabled={hasError || !isSignedIn}
					onClick={handleNavigateToNextStep}
				>
					Próximo passo <ArrowRight />
				</Button>
			</ConnectBox>
		</Container>
	)
}
