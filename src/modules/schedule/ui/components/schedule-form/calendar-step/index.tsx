import { Calendar } from '@/components/calendar'
import {
	Container,
	TimePicker,
	TimePickerHeader,
	TimePickerItem,
	TimePickerList,
} from './styles'

export const CalendarStep = () => {
	const hasSelectedDate = true

	return (
		<Container isTimePickerOpen={hasSelectedDate}>
			<Calendar />
			{hasSelectedDate && (
				<TimePicker>
					<TimePickerHeader>
						Domingo <span>04 de Outubro</span>
					</TimePickerHeader>
					<TimePickerList>
						<TimePickerItem>08:00h</TimePickerItem>
						<TimePickerItem>09:00h</TimePickerItem>
						<TimePickerItem>10:00h</TimePickerItem>
						<TimePickerItem>11:00h</TimePickerItem>
						<TimePickerItem>12:00h</TimePickerItem>
						<TimePickerItem>13:00h</TimePickerItem>
						<TimePickerItem>14:00h</TimePickerItem>
						<TimePickerItem>15:00h</TimePickerItem>
						<TimePickerItem>16:00h</TimePickerItem>
						<TimePickerItem>17:00h</TimePickerItem>
						<TimePickerItem>18:00h</TimePickerItem>
					</TimePickerList>
				</TimePicker>
			)}
		</Container>
	)
}
