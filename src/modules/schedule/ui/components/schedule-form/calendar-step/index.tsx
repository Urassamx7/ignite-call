import dayjs from 'dayjs'
import { useState } from 'react'
import { Calendar } from '@/components/calendar'
import {
	Container,
	TimePicker,
	TimePickerHeader,
	TimePickerItem,
	TimePickerList,
} from './styles'

export const CalendarStep = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const hasSelectedDate = !!selectedDate

	const weekDay = selectedDate
		? dayjs(selectedDate).format('dddd').charAt(0).toUpperCase() +
			dayjs(selectedDate).format('dddd').slice(1)
		: null
	const describedDate = selectedDate
		? dayjs(selectedDate)
				.format('DD[ de ]MMMM')
				.replace(
					/^(\d{2}\[ de \])(\w)/,
					(_, p1, p2) => p1 + p2.toUpperCase()
				)
				.replace(
					/ de ([a-zA]+)/,
					(_, month) =>
						` de ${month.charAt(0).toUpperCase()}${month.slice(1)}`
				)
		: null

	return (
		<Container isTimePickerOpen={hasSelectedDate}>
			<Calendar
				onDateSelected={setSelectedDate}
				selectedDate={selectedDate}
			/>
			{hasSelectedDate && (
				<TimePicker>
					<TimePickerHeader>
						{weekDay} <span>{describedDate}</span>
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
