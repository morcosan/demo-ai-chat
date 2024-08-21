export const isValidPagination = (page: number, count: number, total: number): boolean => {
	return page <= Math.ceil(total / count)
}
