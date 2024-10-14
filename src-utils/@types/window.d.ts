/* eslint-disable no-var */

import { ClassValue } from 'clsx'
import type { TFunction } from 'i18next'

export {}

declare global {
	var t: TFunction
	var LOG: (...args: unknown[]) => void
	var LOG_DEV: (...args: unknown[]) => void
	var cx: (...args: ClassValue[]) => string
	var wait: (time: number) => Promise<void>
}
