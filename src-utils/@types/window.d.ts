/* eslint-disable no-var */

import { ClassValue } from 'clsx'

export {}

declare global {
	var LOG: (...args: unknown[]) => void
	var LOG_DEV: (...args: unknown[]) => void
	var cx: (...args: ClassValue[]) => string
	var wait: (time: number) => Promise<void>
}
