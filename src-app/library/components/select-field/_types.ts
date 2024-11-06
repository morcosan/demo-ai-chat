import { TextFieldSize } from '@ds/src/components/text-field'

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
	popupPos?: 'top' | 'bottom'
	subtle?: boolean
	compValue?: JsxFn<SelectOptionProps>
	compOption?: JsxFn<SelectOptionProps>
	onChange?(value: unknown): void
}

export interface SelectOptionProps {
	option: unknown
	selected?: boolean
}
