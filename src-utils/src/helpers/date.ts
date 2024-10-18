import { capitalize } from 'lodash'

export enum DateFormat {
	DD_MM,
	DD_MM_TT,
	DD_MM_YY,
	DD_MM_YY_TT,
	EDIT_DATE,
	EDIT_DATETIME,
	EDIT_TIME,
	TIME,
	WD_DD_MM,
	WD_DD_MM_TT,
	WD_DD_MM_YY,
	WD_DD_MM_YY_TT,
}

export const fixDatetime = (datetime: Datetime): Datetime => {
	return typeof datetime !== 'string' || datetime.includes('+') || datetime.includes('.') // ISO format
		? datetime
		: datetime.replace(/-/g, '/').replace(/T/g, ' ') // Fix date for Safari
}

export const formatDate = (datetime: Datetime, format: DateFormat, locale: Intl.LocalesArgument): string => {
	const date = new Date(fixDatetime(datetime))
	const year = 'numeric'
	const month = 'short'
	const day = 'numeric'
	const hour = 'numeric'
	const minute = 'numeric'
	const weekday = 'long'
	const digitFn = (value: number) => (value < 10 ? `0${value}` : value)

	if (format === DateFormat.TIME) {
		return date.toLocaleTimeString(locale, { hour, minute })
	}

	if (format === DateFormat.EDIT_DATE) {
		const year = date.getFullYear()
		const month = digitFn(date.getMonth() + 1)
		const day = digitFn(date.getDate())
		return `${year}-${month}-${day}`
	}

	if (format === DateFormat.EDIT_DATETIME) {
		const year = date.getFullYear()
		const month = digitFn(date.getMonth() + 1)
		const day = digitFn(date.getDate())
		const hours = digitFn(date.getHours())
		const minutes = digitFn(date.getMinutes())
		return `${year}-${month}-${day} ${hours}:${minutes}`
	}

	if (format === DateFormat.EDIT_TIME) {
		const hours = digitFn(date.getHours())
		const minutes = digitFn(date.getMinutes())
		return `${hours}:${minutes}`
	}

	let options: Intl.DateTimeFormatOptions = {}

	if (format === DateFormat.DD_MM) options = { month, day }
	if (format === DateFormat.DD_MM_TT) options = { month, day, hour, minute }
	if (format === DateFormat.DD_MM_YY) options = { year, month, day }
	if (format === DateFormat.DD_MM_YY_TT) options = { year, month, day, hour, minute }
	if (format === DateFormat.WD_DD_MM) options = { weekday, day, month }
	if (format === DateFormat.WD_DD_MM_TT) options = { weekday, day, month, hour, minute }
	if (format === DateFormat.WD_DD_MM_YY) options = { weekday, day, month, year }
	if (format === DateFormat.WD_DD_MM_YY_TT) options = { weekday, day, month, year, hour, minute }

	return capitalize(options ? date.toLocaleDateString(locale, options) : '')
}
