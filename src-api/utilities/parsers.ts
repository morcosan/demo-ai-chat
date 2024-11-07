export type IntCheckFn = (value: number) => boolean

export const extractInt = (text: string | number = '', fallback: number = 0, checkFn?: IntCheckFn): number => {
	const value = parseInt(String(text))
	const result = isNaN(value) ? fallback : value

	return checkFn ? (checkFn(result) ? result : fallback) : result
}

export const extractBool = (text: string | number | boolean = ''): boolean => {
	return text === 'true' || text === '1' || text === 1
}

export const extractIntArray = (text: string = '', checkFn?: IntCheckFn): number[] => {
	return text
		.split(',')
		.map((value: string) => parseInt(String(value)))
		.filter((value: number) => !isNaN(value) && (checkFn ? checkFn(value) : true))
}

export const isGreaterThanZero = (value: number) => value > 0
