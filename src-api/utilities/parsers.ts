export type IntCheckFn = (value: number) => boolean

export const extractInt = (text: string | number = '', fallback: number = 0, checkFn?: IntCheckFn): number => {
	const value = parseInt(String(text))
	const result = isNaN(value) ? fallback : value

	return checkFn ? (checkFn(result) ? result : fallback) : result
}

export const isGreaterThanZero = (value: number) => value > 0
