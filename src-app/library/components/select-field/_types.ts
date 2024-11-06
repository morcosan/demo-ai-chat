import { TextFieldSize } from '@ds/release'
import { ReactNode } from 'react'

export interface SelectFieldProps extends ReactProps {
	id: string
	value: unknown
	options: object[]
	keyLabel?: string
	keyValue?: string
	size?: TextFieldSize
	placeholder?: string
	ariaLabel?: string
	ariaDescription?: string
	disabled?: boolean
	readonly?: boolean
	invalid?: boolean
	loading?: boolean
	popupPos?: 'top' | 'bottom'
	subtle?: boolean
	compValue?: JsxFn<SelectOptionProps>
	compOption?: JsxFn<SelectOptionProps>
	slotLoadingMore?: ReactNode
	onChange?(value: unknown): void
	onSearch?(search: string): void
	onScrollEnd?(): void
}

export interface SelectOptionProps {
	option: unknown
	selected?: boolean
}
