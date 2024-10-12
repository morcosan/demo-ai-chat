import { CSSObject } from '@emotion/react'
import { ChangeEvent, CSSProperties, FocusEvent, KeyboardEvent, MouseEvent, ReactNode } from 'react'

export {}
declare global {
	type ReactChangeEvent<T = unknown> = ChangeEvent<T>
	type ReactFocusEvent = FocusEvent
	type ReactKeyboardEvent = KeyboardEvent
	type ReactMouseEvent = MouseEvent

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

	type SvgGlobImport = Record<string, { default: ReactNode }>
}
