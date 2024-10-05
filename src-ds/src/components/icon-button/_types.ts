import { MouseEvent } from 'react'
import { LinkType } from '../_shared/types'

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type IconButtonVariant =
	| 'text-default'
	| 'text-danger'
	| 'solid-primary'
	| 'solid-secondary'
	| 'solid-danger'

export interface IconButtonProps extends ReactProps {
	tooltip: string
	size?: IconButtonSize
	variant?: IconButtonVariant
	pressed?: boolean
	loading?: boolean
	disabled?: boolean
	linkHref?: string
	linkType?: LinkType

	onClick?(event: MouseEvent): void
}
