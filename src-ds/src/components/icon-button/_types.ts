import { ReactNode } from 'react'
import { LinkType } from '../_shared/types'

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type IconButtonVariant =
	| 'text-default'
	| 'text-subtle'
	| 'text-danger'
	| 'solid-primary'
	| 'solid-secondary'
	| 'solid-danger'
	| 'ghost-primary'
	| 'ghost-secondary'
	| 'ghost-danger'

export interface IconButtonProps {
	// Slots
	children: ReactNode
	tooltip: string
	ariaDescription?: string

	// Props
	size?: IconButtonSize
	variant?: IconButtonVariant
	pressed?: boolean
	loading?: boolean
	disabled?: boolean
	linkHref?: string
	linkType?: LinkType
	className?: string

	// Events
	onClick?(event: ReactMouseEvent): void
}
