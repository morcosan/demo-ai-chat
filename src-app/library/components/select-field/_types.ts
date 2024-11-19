import { TextFieldSize, TextFieldVariant } from '@ds/release'

export interface SelectFieldProps extends ReactProps {
	id: string
	value: unknown
	options: object[]
	keyLabel?: string
	keyValue?: string
	filterFn?: SelectFilterFn
	variant?: TextFieldVariant
	size?: TextFieldSize
	placeholder?: string
	ariaLabel?: string
	ariaDescription?: string
	ariaDescribedBy?: string
	disabled?: boolean
	readonly?: boolean
	invalid?: boolean
	loading?: boolean
	loadingMore?: boolean
	canLoadMore?: boolean
	loadingText?: string
	popupPos?: 'top' | 'bottom'
	subtle?: boolean
	compValue?: JsxFn<SelectOptionProps>
	compOption?: JsxFn<SelectOptionProps>
	onChange?(value: unknown): void
	onSearch?(search: string): void
	onScrollEnd?(): void
}

export interface SelectOptionProps {
	option: SelectOption | unknown
	selected?: boolean
}

export interface SelectOption<T = unknown> {
	label: string
	value: T
}

export type SelectFilterFn = (option: object, keyword: string) => boolean
