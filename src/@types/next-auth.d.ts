import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface User {
		id: string
		avatarUrl: string | null
		email: string
		name: string
		username: string
	}

	interface Session {
		user: User
	}
}
