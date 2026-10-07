import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { getWeekDays } from '@/utils/get-week-days'
import {
	CalendarActions,
	CalendarBody,
	CalendarContainer,
	CalendarDay,
	CalendarHeader,
	CalendarTitle,
} from './styles'

interface CalendarWeek {
	week: number
	days: Array<{
		date: dayjs.Dayjs
		disabled: boolean
	}>
}
interface CalendarProps {
	selectedDate: Date | null
	onDateSelected: (date: Date) => void
}

type CalendarWeeks = CalendarWeek[]

export const Calendar = ({ selectedDate, onDateSelected }: CalendarProps) => {
	const [currentDate, setCurrentDate] = useState(() => {
		return dayjs().set('date', 1)
	})

	const shortWeekDays = getWeekDays({ short: true })

	const currentMonth = currentDate.format('MMMM')
	const currentYear = currentDate.format('YYYY')

	function handlePreviousMonth() {
		const previousMonthDate = currentDate.subtract(1, 'month')
		setCurrentDate(previousMonthDate)
	}
	function handleNextMonth() {
		const nextMonthDate = currentDate.add(1, 'month')
		setCurrentDate(nextMonthDate)
	}

	const calendarWeeks = useMemo(() => {
		const daysInMonthArray = Array.from({
			length: currentDate.daysInMonth(),
		}).map((_, index) => {
			return currentDate.add(index, 'day')
		})

		const firstWeekDay = currentDate.get('day')

		const previousMonthFillArray = Array.from({ length: firstWeekDay })
			.map((_, index) => {
				return currentDate.subtract(index + 1, 'day')
			})
			.reverse()

		const lastDayInCurrentMonth = currentDate.set(
			'date',
			currentDate.daysInMonth()
		)

		const lastWeekDay = lastDayInCurrentMonth.get('day')

		const nextMonthFillArray = Array.from({
			length: 7 - (lastWeekDay + 1),
		}).map((_, index) => {
			return lastDayInCurrentMonth.add(index + 1, 'day')
		})

		const calendarDays = [
			...previousMonthFillArray.map((date) => {
				return { date, disabled: true }
			}),
			...daysInMonthArray.map((date) => {
				return {
					date,
					disabled: date.endOf('day').isBefore(new Date()),
				}
			}),
			...nextMonthFillArray.map((date) => {
				return { date, disabled: true }
			}),
		]

		const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
			(weeks, _, index, original) => {
				const isNewWeek = index % 7 === 0

				if (isNewWeek) {
					weeks.push({
						week: index / 7 + 1,
						days: original.slice(index, index + 7),
					})
				}

				return weeks
			},
			[]
		)

		return calendarWeeks
	}, [currentDate])

	return (
		<CalendarContainer>
			<CalendarHeader>
				<CalendarTitle>
					{currentMonth} <span>{currentYear}</span>
				</CalendarTitle>
				<CalendarActions>
					<button
						type='button'
						onClick={handlePreviousMonth}
						title='Mês passado'
					>
						<CaretLeft />
					</button>
					<button
						type='button'
						onClick={handleNextMonth}
						title='Próximo mês'
					>
						<CaretRight />
					</button>
				</CalendarActions>
			</CalendarHeader>

			<CalendarBody>
				<thead>
					<tr>
						{shortWeekDays.map((weekDay) => {
							return <th key={weekDay}>{weekDay}.</th>
						})}
					</tr>
				</thead>
				<tbody>
					{calendarWeeks.map(({ days, week }) => {
						return (
							<tr key={week}>
								{days.map(({ date, disabled }) => {
									return (
										<td key={date.toString()}>
											<CalendarDay
												disabled={disabled}
												onClick={() =>
													onDateSelected(
														date.toDate()
													)
												}
											>
												{date.get('date')}
											</CalendarDay>
										</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</CalendarBody>
		</CalendarContainer>
	)
}
