'use client'

import { getCssText } from '@urassamx7/react'
import { globalStyles } from './styles/global'

interface ProviderProps {
	children: React.ReactNode
}

globalStyles()

export const Providers = ({ children }: ProviderProps) => {
	return (
		<>
			<style
				id='stitches'
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <Use Stitches SSR>
				dangerouslySetInnerHTML={{ __html: getCssText() }}
				suppressHydrationWarning
			/>
			<div className='max-w-8xl'>{children}</div>
		</>
	)
}
