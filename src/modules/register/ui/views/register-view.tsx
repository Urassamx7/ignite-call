'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { AxiosError } from 'axios'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { TextInput } from '@/app/components/text-input'
import { api } from '@/lib/axios'
import { Container, Form, FormError, Header } from '../styles/styles'

export const registerSchema = z.object({
	username: z
		.string('O nome de usuário é obrigatório')
		.min(3, 'O nome deve ter pelomenos 3 caracteres')
		.regex(/^([a-z0-9\\-]+)$/i, {
			message: 'O usuário pode ter apenas letras, números e hífens',
		})
		.transform((username) => username.toLocaleLowerCase()),
	name: z.string().min(3, 'O nome deve ter pelomenos 3 caracteres'),
})

type RegisterData = z.infer<typeof registerSchema>

export const RegisterView = ({ username }: { username?: string }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<RegisterData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			username: username ?? '',
		},
	})

	useEffect(() => {
		if (username) {
			setValue('username', String(username))
		}
	}, [username, setValue])

	async function onSubmit(data: RegisterData) {
		try {
			await api.post('/users', {
				name: data.name,
				username: data.username,
			})
		} catch (error) {
			if (error instanceof AxiosError) {
				alert(error.response?.data.message)
			}
			console.error(error)
		}
	}

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
			<Form as='form' onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='text-input'>
					<Text size='sm'>Nome de usuário</Text>
					<TextInput
						id='text-input'
						prefix='ignite.com/'
						placeholder='seu-usuario'
						{...register('username')}
					/>
					{errors.username && (
						<FormError size='sm'>
							{errors.username.message}
						</FormError>
					)}
				</label>
				<label htmlFor='text-input-2'>
					<Text size='sm'>Nome completo</Text>
					<TextInput
						id='text-input-2'
						placeholder='Seu nome'
						{...register('name')}
					/>
					{errors.name && (
						<FormError size='sm'>{errors.name.message}</FormError>
					)}
				</label>

				<Button type='submit' disabled={isSubmitting}>
					Próximo passo
					<ArrowRight />
				</Button>
			</Form>
		</Container>
	)
}
