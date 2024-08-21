export function showBlueLogs(...args: any[]) {
	console.log('\x1b[34m') // Blue text
	console.log(...args)
	console.log('\x1b[37m') // White text
}
