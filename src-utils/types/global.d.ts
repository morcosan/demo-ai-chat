import { CSSObject } from '@emotion/react'
import { ChangeEvent, CSSProperties, FocusEvent, KeyboardEvent, MouseEvent, ReactNode } from 'react'

export {}
declare global {
	export type ReactChangeEvent<T = unknown> = ChangeEvent<T>
	export type ReactFocusEvent = FocusEvent
	export type ReactKeyboardEvent = KeyboardEvent
	export type ReactMouseEvent = MouseEvent

	interface ReactProps {
		className?: string
		style?: CSSProperties
		children?: ReactNode
	}

	type JsxProps<C> = C extends JsxFn<infer P> ? P : unknown
	type JsxFn<P> = (props: P) => unknown

	type CSS = CSSObject

	interface Pagination {
		page: number
		count: number
	}

	type ListLoading = false | 'full' | 'more' | 'update'
}
