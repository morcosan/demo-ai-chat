import { MouseEvent } from 'react'

export type ButtonVariant =
	| 'solid-primary'
	| 'solid-secondary'
	| 'solid-danger'
	| 'text-default'
	| 'text-danger'
	| 'item-text-default'
	| 'item-text-danger'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type LinkType = 'internal' | 'external' | 'inactive'

export interface ButtonProps extends ReactProps {
	variant?: ButtonVariant
	size?: ButtonSize
	loading?: boolean
	disabled?: boolean
	pressed?: boolean
	linkHref?: string
	linkType?: LinkType
	tooltip?: string

	onClick?(event: MouseEvent): void
}
