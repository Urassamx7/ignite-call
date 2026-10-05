import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '@/utils/get-week-days'
import {
	CalendarActions,
	CalendarBody,
	CalendarContainer,
	CalendarDay,
	CalendarHeader,
	CalendarTitle,
} from './styles'

export const Calendar = () => {
	const shortWeekDays = getWeekDays({ short: true })

	return (
		<CalendarContainer>
			<CalendarHeader>
				<CalendarTitle>
					Outubro <span>2026</span>
				</CalendarTitle>
				<CalendarActions>
					<button type='button'>
						<CaretLeft />
					</button>
					<button type='button'>
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
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td>
							<CalendarDay>1</CalendarDay>
						</td>
						<td>
							<CalendarDay disabled>2</CalendarDay>
						</td>
						<td>
							<CalendarDay>3</CalendarDay>
						</td>
						<td>
							<CalendarDay>4</CalendarDay>
						</td>
					</tr>
					<tr>
						<td>
							<CalendarDay>1</CalendarDay>
						</td>
						<td>
							<CalendarDay disabled>2</CalendarDay>
						</td>
						<td>
							<CalendarDay>3</CalendarDay>
						</td>
						<td>
							<CalendarDay>4</CalendarDay>
						</td>
						<td>
							<CalendarDay>1</CalendarDay>
						</td>
						<td>
							<CalendarDay disabled>2</CalendarDay>
						</td>
						<td>
							<CalendarDay>3</CalendarDay>
						</td>
					</tr>
					<tr>
						<td>
							<CalendarDay>1</CalendarDay>
						</td>
						<td>
							<CalendarDay disabled>2</CalendarDay>
						</td>
						<td>
							<CalendarDay>3</CalendarDay>
						</td>
						<td>
							<CalendarDay>4</CalendarDay>
						</td>
						<td>
							<CalendarDay>1</CalendarDay>
						</td>
						<td>
							<CalendarDay disabled>2</CalendarDay>
						</td>
						<td>
							<CalendarDay>3</CalendarDay>
						</td>
					</tr>
					<tr>
						<td>
							<CalendarDay>1</CalendarDay>
						</td>
						<td>
							<CalendarDay disabled>2</CalendarDay>
						</td>
						<td>
							<CalendarDay>3</CalendarDay>
						</td>
						<td>
							<CalendarDay>4</CalendarDay>
						</td>
						<td>
							<CalendarDay>1</CalendarDay>
						</td>
						<td>
							<CalendarDay disabled>2</CalendarDay>
						</td>
						<td>
							<CalendarDay>3</CalendarDay>
						</td>
						<td></td>
					</tr>
				</tbody>
			</CalendarBody>
		</CalendarContainer>
	)
}
