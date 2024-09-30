export const addMinutesToDate = (date: Date | string, minutes: number): Date => {
	return new Date(new Date(date).getTime() + minutes * 60_000)
}
