import dsJson from '../src-ds/version.json'

export const createBuildNumber = (): string => {
	const miliseconds = new Date().getTime()
	const seconds = Math.round(miliseconds / 1000)
	const minutes = Math.round(seconds / 60)
	const range = 1_000_000 // Approx. 2 years
	const digits = String(minutes % range)

	return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(-2)}`
}

export const getDsVersion = () => `v${dsJson.version}`
