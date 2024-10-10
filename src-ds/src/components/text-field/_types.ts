import { ReactNode } from 'react'

export type TextFieldSize = 'sm' | 'md' | 'lg' | 'xl'

export interface TextFieldProps extends ReactProps {
	id: string
	size?: TextFieldSize
	value?: string
	placeholder?: string
	ariaLabel?: string
	ariaDescription?: string
	maxLength?: number
	multiline?: boolean
	minRows?: number
	maxRows?: number
	readonly?: boolean
	disabled?: boolean

	slotLeft?: ReactNode
	slotRight?: ReactNode

	onChange?(value: string, event: ReactChangeEvent): void
	onSubmit?(event: ReactKeyboardEvent): void
	onFocus?(event: ReactFocusEvent): void
	onBlur?(event: ReactFocusEvent): void
}

export interface TextFieldRef {
	focus(): void
	blur(): void
}
