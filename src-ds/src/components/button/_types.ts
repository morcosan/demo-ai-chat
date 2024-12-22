import { ReactNode } from 'react'
import { LinkType } from '../_shared/types'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ButtonVariant =
	| 'solid-primary'
	| 'solid-secondary'
	| 'solid-danger'
	| 'ghost-primary'
	| 'ghost-secondary'
	| 'ghost-danger'
	| 'text-default'
	| 'text-subtle'
	| 'text-danger'
	| 'item-solid-secondary'
	| 'item-text-default'
	| 'item-text-danger'
export type ButtonHighlight = 'default' | 'pressed' | 'selected'

export interface ButtonProps {
	// Slots
	children: ReactNode
	tooltip?: string
	ariaDescription?: string

	// Props
	size?: ButtonSize
	variant?: ButtonVariant
	highlight?: ButtonHighlight
	loading?: boolean
	disabled?: boolean
	linkHref?: string
	linkType?: LinkType
	className?: string

	// Events
	onClick?(event: ReactMouseEvent): void
}
