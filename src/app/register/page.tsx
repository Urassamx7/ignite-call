import { RegisterView } from '@/modules/register/ui/views/register-view'

interface PageProps {
	searchParams: Promise<{ username: string }>
}

export default async function Page({ searchParams }: PageProps) {
	const { username } = await searchParams

	return <RegisterView username={username} />
}
