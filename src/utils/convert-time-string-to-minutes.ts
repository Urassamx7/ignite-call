export function convertTimeToMinutes(timeString: string) {
	console.log(timeString)
	const [hours, minutes] = timeString.split(':').map(Number)

	return hours * 60 + minutes
}
