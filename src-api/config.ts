const getCookie = (key: string, fallback: boolean) => {
	const value = localStorage.getItem(key)
	return value === null ? fallback : value === 'true'
}

const setCookie = (key: string, value: boolean) => {
	localStorage.setItem(key, value ? 'true' : 'false')
}

export const API__RANDOM_ERROR = getCookie('api-random-error', false)
export const API__RANDOM_DELAY = getCookie('api-random-delay', true)

setCookie('api-random-error', API__RANDOM_ERROR)
setCookie('api-random-delay', API__RANDOM_DELAY)
