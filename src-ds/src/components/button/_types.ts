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
	| 'text-danger'
	| 'item-solid-secondary'
	| 'item-text-default'
	| 'item-text-danger'
export type ButtonHighlight = 'default' | 'pressed' | 'selected'

export interface ButtonProps extends ReactProps {
	size?: ButtonSize
	variant?: ButtonVariant
	highlight?: ButtonHighlight
	loading?: boolean
	disabled?: boolean
	linkHref?: string
	linkType?: LinkType
	tooltip?: string
	ariaDescription?: string

	onClick?(event: ReactMouseEvent): void
}
