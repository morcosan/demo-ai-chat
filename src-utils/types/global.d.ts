import { CSSObject } from '@emotion/react'
import { CSSProperties, ReactNode } from 'react'

export {}
declare global {
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

	type ListLoading = false | 'all' | 'more'
}
