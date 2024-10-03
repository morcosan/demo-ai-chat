const computeCookie = <T>(key: string, fallback: T): T => {
	const valueStr = localStorage.getItem(key)
	let value = valueStr as T

	if (typeof fallback === 'number') {
		value = parseFloat(String(valueStr)) as T
		value = isNaN(value as number) ? fallback : value
	}

	if (typeof fallback === 'boolean') {
		value = valueStr === null ? fallback : ((valueStr === 'true') as T)
	}

	value && setCookie(key, value)

	return value
}

const setCookie = (key: string, value: unknown) => {
	if (typeof value === 'boolean') {
		localStorage.setItem(key, value ? 'true' : 'false')
	} else {
		localStorage.setItem(key, String(value))
	}
}

export const API__RANDOM_ERROR = computeCookie('api-random-error', false)
export const API__MAX_THROTTLING = computeCookie('api-max-throttling', 2000)
