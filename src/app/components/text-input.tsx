import { TextInput as IgniteTextInput } from '@ignite-ui/react'
import type { ComponentProps, ForwardRefExoticComponent } from 'react'

type TextInputProps = Omit<ComponentProps<'input'>, 'prefix' | 'size'> & {
	prefix?: string
	size?: 'sm' | 'md'
}

export const TextInput =
	IgniteTextInput as ForwardRefExoticComponent<TextInputProps>
