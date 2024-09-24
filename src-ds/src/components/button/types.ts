import { MouseEvent } from 'react'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ButtonVariant =
	| 'solid-primary'
	| 'solid-secondary'
	| 'solid-danger'
	| 'text-default'
	| 'text-danger'
	| 'item-solid-secondary'
	| 'item-text-default'
	| 'item-text-danger'
export type ButtonHighlight = 'default' | 'pressed' | 'selected'
export type LinkType = 'internal' | 'external' | 'inactive'

export interface ButtonProps extends ReactProps {
	size?: ButtonSize
	variant?: ButtonVariant
	highlight?: ButtonHighlight
	loading?: boolean
	disabled?: boolean
	linkHref?: string
	linkType?: LinkType
	tooltip?: string

	onClick?(event: MouseEvent): void
}
