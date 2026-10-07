import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Calendar } from '@/components/calendar'
import { api } from '@/lib/axios'
import {
	Container,
	TimePicker,
	TimePickerHeader,
	TimePickerItem,
	TimePickerList,
} from './styles'

interface Availability {
	possibleTimes: number[]
	availableTimes: number[]
}

export const CalendarStep = ({ username }: { username: string }) => {
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

	const selectedDateWithoutTime = selectedDate
		? dayjs(selectedDate).format('YYYY-MM-DD')
		: null

	const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD')

	const { data: availability } = useQuery<Availability>({
		queryKey: ['availability', selectedDateWithoutTime],
		queryFn: async () => {
			const response = await api.get(
				`/users/${username}/availability?date=${formattedDate}`
			)

			return response.data
		},
		enabled: !!selectedDate,
	})

	return (
		<Container isTimePickerOpen={hasSelectedDate}>
			<Calendar
				onDateSelected={setSelectedDate}
				selectedDate={selectedDate}
				username={username}
			/>
			{hasSelectedDate && (
				<TimePicker>
					<TimePickerHeader>
						{weekDay} <span>{describedDate}</span>
					</TimePickerHeader>
					<TimePickerList>
						{availability?.possibleTimes.map((hour) => {
							return (
								<TimePickerItem
									key={hour.toString()}
									disabled={
										!availability.availableTimes.includes(
											hour
										)
									}
								>
									{String(hour).padStart(2, '0')}:00h
								</TimePickerItem>
							)
						})}
					</TimePickerList>
				</TimePicker>
			)}
		</Container>
	)
}
