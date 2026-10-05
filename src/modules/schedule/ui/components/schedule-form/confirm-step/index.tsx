import { Button, Text, TextArea } from '@ignite-ui/react'
import { Clock } from 'phosphor-react'
import { TextInput } from '@/components/text-input'
import { ConfirmForm, FormActions, FormHeader } from './styles'

export const ConfirmStep = () => {
	function handleConfirmScheduling() {}

	return (
		<ConfirmForm as='form' onSubmit={handleConfirmScheduling}>
			<FormHeader>
				<Text>05 de Outubro de 2026</Text>
				<Text>
					<Clock /> 18:00
				</Text>
			</FormHeader>
			<label htmlFor='name'>
				<Text size='sm'>Nome completo</Text>
				<TextInput placeholder='Seu nome' id='name' />
			</label>
			<label htmlFor='mail'>
				<Text size='sm'>Endereço de e-mail</Text>
				<TextInput
					type='email'
					placeholder='marvin@example.com'
					id='mail'
				/>
			</label>
			<label htmlFor='obs'>
				<Text size='sm'>Observações</Text>
				<TextArea id='obs' />
			</label>

			<FormActions>
				<Button type='button' variant='tertiary'>
					Cancelar
				</Button>
				<Button type='submit'>Confirmar</Button>
			</FormActions>
		</ConfirmForm>
	)
}
