import { Button, TextInput as IgniteTextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import type { ComponentProps, ForwardRefExoticComponent } from 'react'
import { Form } from './styles'

type TextInputProps = Omit<ComponentProps<'input'>, 'prefix' | 'size'> & {
	prefix?: string
	size?: 'sm' | 'md'
}

const TextInput = IgniteTextInput as ForwardRefExoticComponent<TextInputProps>

export function ClaimUsernameForm() {
	return (
		<Form as='form'>
			<TextInput
				size='sm'
				prefix='ignite.com/'
				placeholder='seu-usuario'
			/>
			<Button size='sm' type='submit'>
				Reservar
				<ArrowRight />
			</Button>
		</Form>
	)
}
