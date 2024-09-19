export {}

declare global {
	function LOG(...args: unknown[]): void
	function LOG_DEV(...args: unknown[]): void
	function wait(time: number): Promise<void>
}
