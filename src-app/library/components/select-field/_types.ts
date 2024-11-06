import { TextFieldSize } from '@ds/release'

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
	loading?: boolean
	loadingMore?: boolean
	disabled?: boolean
	readonly?: boolean
	invalid?: boolean
	popupPos?: 'top' | 'bottom'
	subtle?: boolean
	compValue?: JsxFn<SelectOptionProps>
	compOption?: JsxFn<SelectOptionProps>
	onChange?(value: unknown): void
	onSearch?(search: string): void
	onScrollEnd?(): void
}

export interface SelectOptionProps {
	option: unknown
	selected?: boolean
}
