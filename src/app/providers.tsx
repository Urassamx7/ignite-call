'use client'

import { getCssText } from '@ignite-ui/react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { queryClient } from '@/lib/query-client'
import { globalStyles } from './styles/global'

dayjs.locale('pt-br')

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
			<SessionProvider>
				<QueryClientProvider client={queryClient}>
					<div className='max-w-8xl'>{children}</div>
				</QueryClientProvider>
			</SessionProvider>
		</>
	)
}
