import { MouseEvent } from 'react'

export type ButtonVariant =
	| 'solid-primary'
	| 'solid-secondary'
	| 'solid-danger'
	| 'text-default'
	| 'text-danger'
	| 'item-solid-secondary'
	| 'item-text-default'
	| 'item-text-danger'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ButtonState = 'default' | 'pressed' | 'selected'
export type LinkType = 'internal' | 'external' | 'inactive'

export interface ButtonProps extends ReactProps {
	variant?: ButtonVariant
	size?: ButtonSize
	state?: ButtonState
	loading?: boolean
	disabled?: boolean
	linkHref?: string
	linkType?: LinkType
	tooltip?: string

	onClick?(event: MouseEvent): void
}
