import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: 'Ignite Call',
	description: 'Scheduling app',
}

export const roboto = Roboto({
	variable: '--font-sans',
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	display: 'swap',
})

export const inter = Inter({
	variable: '--font-sans',
	subsets: ['latin'],
})

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang='en'
			className={` ${roboto.className} ${inter.variable} h-full antialiased`}
		>
			<body
				cz-shortcut-listen='true'
				suppressHydrationWarning
				className={`min-h-full flex flex-col ${roboto.className} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
