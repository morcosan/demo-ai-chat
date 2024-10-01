const getCookie = (key: string) => {
	const value = localStorage.getItem(key)
	return value === null ? true : value === 'true'
}

const setCookie = (key: string, value: boolean) => {
	localStorage.setItem(key, value ? 'true' : 'false')
}

export const API__RANDOM_ERROR = getCookie('api-random-error')
export const API__RANDOM_DELAY = getCookie('api-random-delay')

setCookie('api-random-error', API__RANDOM_ERROR)
setCookie('api-random-delay', API__RANDOM_DELAY)
