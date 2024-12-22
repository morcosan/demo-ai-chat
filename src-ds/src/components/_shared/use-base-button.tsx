import { LinkType, useUiTheme } from '@ds/release'
import { ReactNode } from 'react'
import { useClickable } from './use-clickable'

export type BaseButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type BaseButtonHighlight = 'default' | 'pressed' | 'selected'

export type BaseVariant =
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

type Variant = BaseVariant | undefined

const VARIANTS_DANGER: Variant[] = ['solid-danger', 'ghost-danger', 'text-danger', 'item-text-danger']
const VARIANTS_DEFAULT: Variant[] = ['text-default', 'item-text-default']
const VARIANTS_GHOST: Variant[] = ['ghost-primary', 'ghost-secondary', 'ghost-danger']
const VARIANTS_ITEM: Variant[] = ['item-text-default', 'item-text-danger', 'item-solid-secondary']
const VARIANTS_PRIMARY: Variant[] = ['solid-primary', 'ghost-primary']
const VARIANTS_SECONDARY: Variant[] = ['solid-secondary', 'ghost-secondary', 'item-solid-secondary']
const VARIANTS_SOLID: Variant[] = ['solid-primary', 'solid-secondary', 'solid-danger', 'item-solid-secondary']
const VARIANTS_SUBTLE: Variant[] = ['text-subtle']
const VARIANTS_TEXT: Variant[] = [
	'text-default',
	'text-subtle',
	'text-danger',
	'item-text-default',
	'item-text-danger',
]

interface BaseButtonProps {
	// Slots
	children: ReactNode
	tooltip?: string
	ariaDescription?: string

	// Props
	size?: BaseButtonSize
	variant?: BaseVariant
	highlight?: BaseButtonHighlight
	loading?: boolean
	disabled?: boolean
	linkHref?: string
	linkType?: LinkType
	className?: string
}

export const useBaseButton = (props: BaseButtonProps) => {
	const { $color, $spacing } = useUiTheme()
	const { bindings, isNoop, isPressed } = useClickable(props)

	const isVDanger = VARIANTS_DANGER.includes(props.variant)
	const isVDefault = VARIANTS_DEFAULT.includes(props.variant)
	const isVGhost = VARIANTS_GHOST.includes(props.variant)
	const isVItem = VARIANTS_ITEM.includes(props.variant)
	const isVPrimary = VARIANTS_PRIMARY.includes(props.variant)
	const isVSecondary = VARIANTS_SECONDARY.includes(props.variant)
	const isVSolid = VARIANTS_SOLID.includes(props.variant)
	const isVSubtle = VARIANTS_SUBTLE.includes(props.variant)
	const isVText = VARIANTS_TEXT.includes(props.variant)

	const baseTokens = {
		size: (() => {
			if (props.size === 'xs') return $spacing['button-h-xs']
			if (props.size === 'sm') return $spacing['button-h-sm']
			if (props.size === 'md') return $spacing['button-h-md']
			if (props.size === 'lg') return $spacing['button-h-lg']
			return ''
		})(),
		bgColor: (() => {
			if (isVSolid) {
				if (isNoop) return $color['text-subtle']
				if (isVPrimary) return $color['primary-button-bg']
				if (isVSecondary) return $color['secondary-button-bg']
				if (isVDanger) return $color['danger-button-bg']
			}
			return 'transparent'
		})(),
		borderColor: (() => {
			if (isVGhost) {
				if (isNoop) return $color['text-subtle']
				if (isVPrimary) return $color['primary-page-text']
				if (isVSecondary) return $color['secondary-page-text']
				if (isVDanger) return $color['danger-page-text']
			}
			if (isVSolid) {
				if (isNoop) return $color['text-subtle']
				if (isVPrimary) return $color['primary-button-bg']
				if (isVSecondary) return $color['secondary-button-bg']
				if (isVDanger) return $color['danger-button-bg']
			}
			return 'transparent'
		})(),
		textColor: (() => {
			if (isVSolid) {
				if (isNoop) return $color['white']
				if (isVPrimary) return $color['primary-button-text']
				if (isVSecondary) return $color['secondary-button-text']
				if (isVDanger) return $color['danger-button-text']
			}
			if (isNoop) return $color['text-subtle']
			if (isVGhost) {
				if (isVPrimary) return $color['primary-page-text']
				if (isVSecondary) return $color['secondary-page-text']
				if (isVDanger) return $color['danger-page-text']
			}
			if (isVDanger) return $color['danger-page-text']
			if (isVDefault) return $color['text-default']
			if (isVSubtle) return $color['text-subtle']
			return ''
		})(),
		hoverBgColor: (() => {
			if (isNoop) return 'transparent'
			if (props.highlight === 'default') {
				if (isVText || isVGhost) return $color['hover-text-default']
				if (isVPrimary) return $color['primary-hover-default']
				if (isVSecondary) return $color['secondary-hover-default']
				if (isVDanger) return $color['danger-hover-default']
			}
			return ''
		})(),
		pressBgColor: (() => {
			if (isNoop || props.highlight === 'selected') return 'transparent'
			if (isPressed || props.highlight === 'pressed') {
				if (isVText || isVGhost) return $color['hover-text-pressed']
				if (isVPrimary) return $color['primary-hover-pressed']
				if (isVSecondary) return $color['secondary-hover-pressed']
				if (isVDanger) return $color['danger-hover-pressed']
			}
			return ''
		})(),
		pressTransform: isPressed && props.highlight === 'default' ? 'translateY(1px)' : 'unset',
		outlineOffset: `calc(1px + ${$spacing['a11y-outline']})`, // CSS bug: outline offset overlaps border width
		opacity: isNoop ? 0.4 : 1,
		cursor: isNoop ? 'not-allowed' : 'pointer',
	}

	const cssBaseButton: CSS = {
		position: 'relative',
		display: 'inline-block',
		height: baseTokens.size,
		minHeight: baseTokens.size,
		border: `1px solid ${baseTokens.borderColor}`,
		backgroundColor: baseTokens.bgColor,
		opacity: baseTokens.opacity,
		color: baseTokens.textColor,
		fill: 'currentColor',
		stroke: 'currentColor',
		outlineOffset: baseTokens.outlineOffset,
		cursor: baseTokens.cursor,
		verticalAlign: 'middle',
		transform: baseTokens.pressTransform,

		'&::before, &::after': {
			content: `''`,
			position: 'absolute',
			top: '-1px',
			left: '-1px',
			right: '-1px',
			bottom: '-1px',
		},
		'&::before': isVSolid && !isNoop ? { border: `1px solid ${$color['black-glass-3']}` } : {},
		'&::after': { backgroundColor: `${baseTokens.pressBgColor} !important` },
		'&:hover::after, &:focus::after': { backgroundColor: baseTokens.hoverBgColor },
	}
	const cssBaseChildren: CSS = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: isVItem ? 'unset' : 'center',
		width: '100%',
		height: '100%',
		opacity: props.loading ? 0 : 1,
		pointerEvents: 'none',
		userSelect: 'none',
	}

	const baseBindings = {
		...bindings,
		title: props.tooltip,
		className: props.className,
		'aria-description': props.ariaDescription,
		css: cssBaseButton,
	}

	return {
		baseBindings,
		baseTokens,
		cssBaseButton,
		cssBaseChildren,
		isNoop,
		isPressed,
		isVDanger,
		isVDefault,
		isVGhost,
		isVItem,
		isVPrimary,
		isVSecondary,
		isVSolid,
		isVSubtle,
		isVText,
	}
}
