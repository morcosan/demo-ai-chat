import clsx from 'clsx'

window.cx = clsx

window.wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

window.ERROR = (...args: unknown[]) => console.error(...args)

window.LOG = (...args: unknown[]) => {
	const format: unknown[] = ['%c', 'color: lightgreen']

	for (const arg of args) {
		if (typeof arg === 'string') {
			format[0] += ' %s'
		} else {
			break
		}
	}

	console.log(...format.concat(args))
}

window.LOG_DEV = (...args: unknown[]) => LOG(...args)

window.log = (...args: unknown[]) => console.log(...args)
