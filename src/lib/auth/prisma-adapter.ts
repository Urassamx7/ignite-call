import { cookies } from 'next/headers'
import type { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'

export function PrismaAdapter(): Adapter {
	return {
		async createUser(user) {
			// This function will upsert a pre-registered user
			const cookieStore = await cookies()
			const userIdOnCookies = cookieStore.get('@ignitecall:userId')?.value

			if (!userIdOnCookies) {
				throw new Error('User Id not found on cookies')
			}

			const prismaUser = await prisma.user.update({
				where: {
					id: userIdOnCookies,
				},
				data: {
					name: user.name,
					email: user.email,
					avatarUrl: user.avatarUrl,
				},
			})

			cookieStore.delete('@ignitecall:userId').delete

			return {
				id: prismaUser.id,
				name: prismaUser.name,
				username: prismaUser.username,
				email: prismaUser.email,
				avatarUrl: prismaUser.avatarUrl,
				emailVerified: null,
			}
		},

		async getUser(id) {
			const user = await prisma.user.findUnique({
				where: { id },
			})

			if (!user) {
				return null
			}

			return {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email,
				avatarUrl: user.avatarUrl,
				emailVerified: null,
			}
		},
		async getUserByEmail(email) {
			const user = await prisma.user.findUnique({
				where: { email },
			})

			if (!user) {
				return null
			}

			return {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email,
				avatarUrl: user.avatarUrl,
				emailVerified: null,
			}
		},

		async getUserByAccount({ providerAccountId, provider }) {
			const account = await prisma.account.findUnique({
				where: {
					provider_providerAccountId: { provider, providerAccountId },
				},
				include: {
					user: true,
				},
			})

			if (!account) {
				return null
			}

			return {
				id: account.user.id,
				name: account.user.name,
				username: account.user.username,
				email: account.user.email,
				avatarUrl: account.user.avatarUrl,
				emailVerified: null,
			}
		},

		async updateUser(user) {
			const prismaUser = await prisma.user.update({
				where: { id: user.id },
				data: {
					name: user.name,
					email: user.email,
					avatarUrl: user.avatarUrl,
				},
			})

			return {
				id: prismaUser.id,
				name: prismaUser.name,
				username: prismaUser.username,
				email: prismaUser.email,
				avatarUrl: prismaUser.avatarUrl,
				emailVerified: null,
			}
		},

		async linkAccount(account) {
			await prisma.account.create({
				data: {
					userId: account.userId,
					type: account.type,
					provider: account.provider,
					providerAccountId: account.providerAccountId,
					refreshToken: account.refresh_token,
					accessToken: account.access_token,
					expiresAt: account.expires_at,
					tokenType: account.token_type,
					scope: account.scope,
					idToken: account.id_token,
					sessionState: account.session_state,
				},
			})
		},

		async createSession({ sessionToken, userId, expires }) {
			await prisma.session.create({
				data: {
					userId,
					expires,
					sessionToken,
				},
			})

			return {
				expires,
				userId,
				sessionToken,
			}
		},

		async getSessionAndUser(sessionToken) {
			const session = await prisma.session.findUnique({
				where: { sessionToken },
				include: {
					user: true,
				},
			})

			if (!session) {
				return null
			}

			return {
				session: {
					userId: session.userId,
					expires: session.expires,
					sessionToken: session.sessionToken,
				},
				user: {
					id: session.user.id,
					name: session.user.name,
					username: session.user.username,
					email: session.user.email,
					avatarUrl: session.user.avatarUrl,
					emailVerified: null,
				},
			}
		},

		async updateSession({ sessionToken, userId, expires }) {
			const prismaSession = await prisma.session.update({
				where: {
					sessionToken,
				},
				data: {
					expires,
					userId,
				},
			})

			return {
				sessionToken: prismaSession.sessionToken,
				userId: prismaSession.userId,
				expires: prismaSession.expires,
			}
		},

		async deleteSession(sessionToken) {
			await prisma.session.delete({
				where: {
					sessionToken,
				},
			})
		},
	}
}
