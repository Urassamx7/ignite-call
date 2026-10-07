import { CalendarStep } from './calendar-step'

export const ScheduleForm = ({ username }: { username: string }) => {
	return <CalendarStep username={username} />
}
