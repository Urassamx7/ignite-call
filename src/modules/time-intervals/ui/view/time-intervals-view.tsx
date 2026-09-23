'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { TextInput } from '@/app/components/text-input'
import { Container, Header } from '@/modules/register/ui/styles/styles'
import { convertTimeToMinutes } from '@/utils/convert-time-string-to-minutes'
import { getWeekDays } from '@/utils/get-week-days'
import {
	FormError,
	IntervalBox,
	IntervalDay,
	IntervalInputs,
	IntervalItem,
	IntervalsContainer,
} from '../styles'

const timeIntervalsFormSchema = z.object({
	intervals: z
		.array(
			z.object({
				weekDay: z.number().min(0).max(6),
				enabled: z.boolean(),
				startTime: z.string(),
				endTime: z.string(),
			})
		)
		.length(7)
		.transform((intervals) =>
			intervals.filter((interval) => interval.enabled)
		)
		.refine(
			(intervals) => intervals.length > 0,
			'Você precisa selecionar pelomenos 1 dia da semana'
		)
		.transform((intervals) => {
			return intervals.map((interval) => {
				return {
					weekDay: interval.weekDay,
					startTimeInMinutes: convertTimeToMinutes(
						interval.startTime
					),
					endTimeInMinutes: convertTimeToMinutes(interval.endTime),
				}
			})
		})
		.refine((intervals) => {
			return intervals.every(
				(interval) =>
					interval.endTimeInMinutes - 60 >=
					interval.startTimeInMinutes
			)
		}, 'O horário de termino e inicio devem ter uma diferença de pelomenos 1 hora.'),
})

// type TimeIntervalsInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsOutput = z.output<typeof timeIntervalsFormSchema>

export const TimeIntervalsView = () => {
	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
		watch,
	} = useForm({
		resolver: zodResolver(timeIntervalsFormSchema),
		defaultValues: {
			intervals: [
				{
					weekDay: 0,
					enabled: false,
					startTime: '08:00',
					endTime: '17:00',
				},
				{
					weekDay: 1,
					enabled: true,
					startTime: '08:00',
					endTime: '17:00',
				},
				{
					weekDay: 2,
					enabled: true,
					startTime: '08:00',
					endTime: '17:00',
				},
				{
					weekDay: 3,
					enabled: true,
					startTime: '08:00',
					endTime: '17:00',
				},
				{
					weekDay: 4,
					enabled: true,
					startTime: '08:00',
					endTime: '17:00',
				},
				{
					weekDay: 5,
					enabled: true,
					startTime: '08:00',
					endTime: '17:00',
				},
				{
					weekDay: 6,
					enabled: false,
					startTime: '08:00',
					endTime: '17:00',
				},
			],
		},
	})

	const weekDays = getWeekDays()

	const { fields } = useFieldArray({
		control,
		name: 'intervals',
	})

	const intervals = watch('intervals')

	async function handleSetTimeIntervals(data: any) {
		const formData = data as TimeIntervalsOutput
		console.log(formData)
	}

	return (
		<Container>
			<Header>
				<Heading as='strong'>Quase lá!</Heading>
				<Text>
					Defina o intervalo de horários que você está disponível em
					cada dia da semana.
				</Text>
				<MultiStep size={4} currentStep={3} />
			</Header>
			<IntervalBox
				as='form'
				onSubmit={handleSubmit(handleSetTimeIntervals)}
			>
				<IntervalsContainer>
					{fields.map((field, index) => {
						return (
							<IntervalItem key={field.id}>
								<IntervalDay>
									<Controller
										name={`intervals.${index}.enabled`}
										control={control}
										render={({ field }) => {
											return (
												<Checkbox
													onCheckedChange={(
														checked
													) => {
														field.onChange(
															checked === true
														)
													}}
													checked={field.value}
												/>
											)
										}}
									/>
									<Text>{weekDays[field.weekDay]}</Text>
								</IntervalDay>
								<IntervalInputs>
									<TextInput
										size='sm'
										type='time'
										step={60}
										lang='pt-BR'
										{...register(
											`intervals.${index}.startTime`
										)}
										disabled={
											intervals[index].enabled === false
										}
									/>
									<TextInput
										size='sm'
										type='time'
										step={60}
										lang='pt-BR'
										{...register(
											`intervals.${index}.endTime`
										)}
										disabled={
											intervals[index].enabled === false
										}
									/>
								</IntervalInputs>
							</IntervalItem>
						)
					})}
				</IntervalsContainer>

				{errors.intervals && (
					<FormError>{errors.intervals.root?.message}</FormError>
				)}

				<Button type='submit' disabled={isSubmitting}>
					Próximo passo <ArrowRight />
				</Button>
			</IntervalBox>
		</Container>
	)
}
