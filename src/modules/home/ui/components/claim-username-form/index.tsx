import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextInput as IgniteTextInput, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import type { ComponentProps, ForwardRefExoticComponent } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormAnnotation } from './styles'

type TextInputProps = Omit<ComponentProps<'input'>, 'prefix' | 'size'> & {
	prefix?: string
	size?: 'sm' | 'md'
}

const TextInput = IgniteTextInput as ForwardRefExoticComponent<TextInputProps>

const claimUsernameSchema = z.object({
	username: z
		.string('O nome de usuário é obrigatório')
		.min(3, 'O nome deve ter pelomenos 3 caracteres')
		.regex(/^([a-z\\-]+)$/i, {
			message: 'O usuário pode ter apenas letras e hífens',
		})
		.transform((username) => username.toLocaleLowerCase()),
})

type ClaimUsername = z.infer<typeof claimUsernameSchema>

export function ClaimUsernameForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ClaimUsername>({
		resolver: zodResolver(claimUsernameSchema),
		defaultValues: {
			username: '',
		},
	})

	async function handleClaimUsername(data: ClaimUsername) {
		console.log(data)
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
				<Button size='sm' type='submit'>
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
