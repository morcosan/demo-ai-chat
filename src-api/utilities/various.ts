export const addMinutesToDate = (date: Date | string, minutes: number): Date => {
	return new Date(new Date(date).getTime() + minutes * 60_000)
}

export const formatDate = (date: Date): string => {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')

	return `${year}-${month}-${day} ${hours}:${minutes}`
}

export const DATETIME_REGEX = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/
