import { ReactNode, Ref } from 'react'

export type TextFieldVariant = 'default' | 'primary' | 'secondary'
export type TextFieldSize = 'sm' | 'md' | 'lg' | 'xl'

export interface TextFieldProps {
	// Slots
	value?: string
	placeholder?: string
	ariaLabel?: string
	ariaDescription?: string
	prefix?: ReactNode
	suffix?: ReactNode

	// Props
	id: string
	variant?: TextFieldVariant
	size?: TextFieldSize
	maxLength?: number
	multiline?: boolean
	minRows?: number
	maxRows?: number
	readonly?: boolean
	disabled?: boolean
	invalid?: boolean
	className?: string

	// Events
	onChange?(value: string, event: ReactChangeEvent): void
	onSubmit?(event: ReactKeyboardEvent): void
	onFocus?(event: ReactFocusEvent): void
	onBlur?(event: ReactFocusEvent): void

	// Methods
	ref?: Ref<TextFieldRef>
}

export interface TextFieldRef {
	setValue(value: string): void
	getValue(): string
	focus(): void
	blur(): void
}
