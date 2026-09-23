'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
	Avatar,
	Button,
	Heading,
	MultiStep,
	Text,
	TextArea,
} from '@ignite-ui/react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import type { Session } from 'next-auth'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { Container, Header } from '@/modules/register/ui/styles/styles'
import { FormAnnotation, ProfileBox } from '../styles'

export const updateProfileSchema = z.object({
	bio: z.string(),
})
type UpdateProfile = z.infer<typeof updateProfileSchema>

type UpdateProfileViewProps = {
	session: Session | null
}

export const UpdateProfileView = ({ session }: UpdateProfileViewProps) => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<UpdateProfile>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {},
	})

	async function onSubmit(data: UpdateProfile) {
		const { bio } = data

		try {
			await api.put('/users/profile', { bio })
			router.push(`/schedule/${session?.user.username}`)
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
				<MultiStep size={4} currentStep={4} />
			</Header>
			<ProfileBox as='form' onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='text-input'>
					<Text size='sm'>Foto de perfil</Text>
					<Avatar
						src={session?.user.avatarUrl ?? ''}
						alt={session?.user.name}
						referrerPolicy='no-referrer'
					/>
				</label>
				<label htmlFor='text-input-2'>
					<Text size='sm'>Sobre você</Text>
					<TextArea
						id='text-input-2'
						placeholder='Sua biografia'
						{...register('bio')}
					/>
					<FormAnnotation size='sm'>
						Fale um pouco sobre você. Isto será exibido em sua
						página pessoal.
					</FormAnnotation>
				</label>

				<Button type='submit' disabled={isSubmitting}>
					Finalizar
				</Button>
			</ProfileBox>
		</Container>
	)
}
