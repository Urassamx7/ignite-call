import { ConnectCalendarView } from '@/modules/connect-calendar/ui/views/connect-calendar-view'

interface PageProps {
	searchParams: Promise<{ error: string }>
}

export default async function Page({ searchParams }: PageProps) {
	const { error } = await searchParams

	return <ConnectCalendarView hasError={!!error} />
}
