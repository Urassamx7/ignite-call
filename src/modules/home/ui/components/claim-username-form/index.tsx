import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text } from '@ignite-ui/react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { TextInput } from '@/app/components/text-input'
import { Form, FormAnnotation } from './styles'

const claimUsernameSchema = z.object({
	username: z
		.string('O nome de usuário é obrigatório')
		.min(3, 'O nome deve ter pelomenos 3 caracteres')
		.regex(/^([a-z0-9\\-]+)$/i, {
			message: 'O usuário pode ter apenas letras, números e hífens',
		})
		.transform((username) => username.toLocaleLowerCase()),
})

type ClaimUsername = z.infer<typeof claimUsernameSchema>

export function ClaimUsernameForm() {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ClaimUsername>({
		resolver: zodResolver(claimUsernameSchema),
		defaultValues: {
			username: '',
		},
	})

	async function handleClaimUsername(data: ClaimUsername) {
		const { username } = data

		router.push(`/register?username=${username}`)
	}

	return (
		<>
			<Form as='form' onSubmit={handleSubmit(handleClaimUsername)}>
				<TextInput
					size='sm'
					prefix='ignite.com/'
					placeholder='seu-usuario'
					{...register('username')}
				/>
				<Button size='sm' type='submit' disabled={isSubmitting}>
					Reservar
					<ArrowRight />
				</Button>
			</Form>
			<FormAnnotation>
				<Text size='sm'>
					{errors.username
						? errors.username.message
						: 'Digite o nome do usuário'}
				</Text>
			</FormAnnotation>
		</>
	)
}
