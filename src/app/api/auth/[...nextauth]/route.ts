import NextAuth, { type NextAuthOptions } from 'next-auth'
import Google, { GoogleProfile } from 'next-auth/providers/google'
import { PrismaAdapter } from '@/lib/auth/prisma-adapter'

const handler: NextAuthOptions = NextAuth({
	adapter: PrismaAdapter(),
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',

			authorization: {
				params: {
					scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar',
				},
			},
			profile: (profile: GoogleProfile) => {
				return {
					id: profile.sub,
					name: profile.name,
					username: '',
					email: profile.email,
					avatarUrl: profile.picture,
				}
			},
		}),
	],
	callbacks: {
		async signIn({ account }) {
			if (
				!account?.scope?.includes(
					'https://www.googleapis.com/auth/calendar'
				)
			) {
				return '/register/connect-calendar?error=permissions'
			}
			return true
		},
	},
})

export { handler as GET, handler as POST }
