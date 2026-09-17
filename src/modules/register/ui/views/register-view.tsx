'use client'

import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { TextInput } from '@/components/text-input'
import { Container, Form, Header } from '../styles/styles'

export const RegisterView = () => {
	return (
		<Container>
			<Header>
				<Heading as='strong'>Bem vindo ao Ignite Call!</Heading>
				<Text>
					Precisamos de algumas informações para criar seu perfil! Ah,
					você pode editar essas informações depois.
				</Text>
				<MultiStep size={4} currentStep={1} />
			</Header>
			<Form as='form'>
				<label htmlFor='text-input'>
					<Text size='sm'>Nome de usuário</Text>
					<TextInput
						id='text-input'
						prefix='ignite.com/'
						placeholder='seu-usuario'
					/>
				</label>
				<label htmlFor='text-input-2'>
					<Text size='sm'>Nome completo</Text>
					<TextInput id='text-input-2' placeholder='Seu nome' />
				</label>

				<Button type='submit'>
					Próximo passo
					<ArrowRight />
				</Button>
			</Form>
		</Container>
	)
}
