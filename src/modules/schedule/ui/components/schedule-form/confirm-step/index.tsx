import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea } from '@ignite-ui/react'
import { Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { TextInput } from '@/components/text-input'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

const confirmFormSchema = z.object({
	name: z.string().min(3, 'O nome deve conter pelomenos 3 caracteres'),
	email: z
		.email('Digite um email válido')
		.min(6, 'O nome deve conter pelomenos 6 caracteres'),
	observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export const ConfirmStep = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ConfirmFormData>({
		resolver: zodResolver(confirmFormSchema),
		defaultValues: {
			email: '',
			name: '',
			observations: null,
		},
	})

	function handleConfirmScheduling(data: ConfirmFormData) {}

	return (
		<ConfirmForm as='form' onSubmit={handleSubmit(handleConfirmScheduling)}>
			<FormHeader>
				<Text>05 de Outubro de 2026</Text>
				<Text>
					<Clock /> 18:00
				</Text>
			</FormHeader>
			<label htmlFor='name'>
				<Text size='sm'>Nome completo</Text>
				<TextInput
					placeholder='Seu nome'
					id='name'
					{...register('name')}
				/>
				{errors.name && <FormError>{errors.name.message}</FormError>}
			</label>
			<label htmlFor='mail'>
				<Text size='sm'>Endereço de e-mail</Text>
				<TextInput
					type='email'
					placeholder='marvin@example.com'
					id='mail'
					{...register('email')}
				/>
				{errors.email && <FormError>{errors.email.message}</FormError>}
			</label>
			<label htmlFor='obs'>
				<Text size='sm'>Observações</Text>
				<TextArea id='obs' {...register('observations')} />
			</label>

			<FormActions>
				<Button type='button' variant='tertiary'>
					Cancelar
				</Button>
				<Button type='submit' disabled={isSubmitting}>
					Confirmar
				</Button>
			</FormActions>
		</ConfirmForm>
	)
}
