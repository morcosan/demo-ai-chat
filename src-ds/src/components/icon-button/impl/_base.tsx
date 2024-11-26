// noinspection DuplicatedCode

import { useUiTheme } from '@ds/release'
import { CSS__ABSOLUTE_OVERLAY, useDefaults } from '@utils/release'
import { useClickable } from '../../_shared/clickable'
import { IconButtonProps, IconButtonVariant } from '../_types'

type Variant = IconButtonVariant | undefined

const VARIANTS_DANGER: Variant[] = ['solid-danger', 'text-danger']
const VARIANTS_DEFAULT: Variant[] = ['text-default']
const VARIANTS_PRIMARY: Variant[] = ['solid-primary']
const VARIANTS_SECONDARY: Variant[] = ['solid-secondary']
const VARIANTS_SOLID: Variant[] = ['solid-primary', 'solid-secondary', 'solid-danger']
const VARIANTS_SUBTLE: Variant[] = ['text-subtle']
const VARIANTS_TEXT: Variant[] = ['text-default', 'text-subtle', 'text-danger']

export const useIconButtonBase = (rawProps: IconButtonProps) => {
	const props = useDefaults<IconButtonProps>(rawProps, {
		size: 'md',
		variant: 'text-default',
		linkType: 'internal',
	})
	const { $color, $spacing, $radius } = useUiTheme()
	const { bindings, isDisabled, isPressed } = useClickable(props)

	const isVDanger = VARIANTS_DANGER.includes(props.variant)
	const isVDefault = VARIANTS_DEFAULT.includes(props.variant)
	const isVPrimary = VARIANTS_PRIMARY.includes(props.variant)
	const isVSecondary = VARIANTS_SECONDARY.includes(props.variant)
	const isVSolid = VARIANTS_SOLID.includes(props.variant)
	const isVSubtle = VARIANTS_SUBTLE.includes(props.variant)
	const isVText = VARIANTS_TEXT.includes(props.variant)

	const cssTextColorFn = (color: string) => ({ color, fill: 'currentColor', stroke: 'currentColor' })
	const cssBgColorFn = (backgroundColor: string) => ({ backgroundColor })
	const cssSizeFn = (size: string) => ({ height: size, minHeight: size, width: size, minWidth: size })
	const cssRadiusFn = (borderRadius: string) => ({ borderRadius, '&::before, &::after': { borderRadius } })
	const cssPressedFn = (color: string) => ({ '&::before': { backgroundColor: color + ' !important' } })
	const cssHoverFn = (backgroundColor: string) => ({
		'&:hover::before': { backgroundColor },
		'&:focus::before': { backgroundColor },
	})

	const cssBase: CSS = {
		position: 'relative',
		zIndex: 0,
		border: '0 solid transparent',
		verticalAlign: 'middle',

		'&::before': {
			...CSS__ABSOLUTE_OVERLAY,
			content: `''`,
			zIndex: -1,
		},

		'&::after': isVSolid
			? {
					...CSS__ABSOLUTE_OVERLAY,
					content: `''`,
					zIndex: -1,
					border: `1px solid ${$color['black-glass-3']}`,
				}
			: {},
	}

	const cssDisabled: CSS = {
		opacity: props.disabled && !props.loading ? 0.3 : 1,
		pointerEvents: isDisabled ? 'none' : 'unset',
	}

	const cssTextColor: CSS = (() => {
		if (isVSolid) {
			if (isVPrimary) return cssTextColorFn($color['primary-button-text'])
			if (isVSecondary) return cssTextColorFn($color['secondary-button-text'])
			if (isVDanger) return cssTextColorFn($color['danger-button-text'])
		}
		if (isVDanger) return cssTextColorFn($color['danger-page-text'])
		if (isVDefault) return cssTextColorFn($color['text-default'])
		if (isVSubtle) return cssTextColorFn($color['text-subtle'])
		return {}
	})()

	const cssBgColor: CSS = (() => {
		if (isVSolid) {
			if (isVPrimary) return cssBgColorFn($color['primary-button-bg'])
			if (isVSecondary) return cssBgColorFn($color['secondary-button-bg'])
			if (isVDanger) return cssBgColorFn($color['danger-button-bg'])
		}
		return {}
	})()

	const cssHover: CSS = (() => {
		if (isDisabled) return {}
		if (!props.pressed) {
			if (isVText) return cssHoverFn($color['hover-text-default'])
			if (isVPrimary) return cssHoverFn($color['primary-hover-default'])
			if (isVSecondary) return cssHoverFn($color['secondary-hover-default'])
			if (isVDanger) return cssHoverFn($color['danger-hover-default'])
		}
		return {}
	})()

	const cssPressed: CSS = (() => {
		if (isDisabled) return {}
		if (isPressed || props.pressed) {
			if (isVText) return cssPressedFn($color['hover-text-pressed'])
			if (isVPrimary) return cssPressedFn($color['primary-hover-pressed'])
			if (isVSecondary) return cssPressedFn($color['secondary-hover-pressed'])
			if (isVDanger) return cssPressedFn($color['danger-hover-pressed'])
		}
		return {}
	})()

	const cssSize: CSS = (() => {
		if (props.size === 'xs') return cssSizeFn($spacing['button-h-xs'])
		if (props.size === 'sm') return cssSizeFn($spacing['button-h-sm'])
		if (props.size === 'md') return cssSizeFn($spacing['button-h-md'])
		if (props.size === 'lg') return cssSizeFn($spacing['button-h-lg'])
		return {}
	})()

	const cssRadius: CSS = isVText ? cssRadiusFn($radius['full']) : cssRadiusFn($radius['sm'])

	const cssAll = [cssBase, cssBgColor, cssDisabled, cssHover, cssPressed, cssRadius, cssSize, cssTextColor]

	const baseBindings = {
		...bindings,
		title: props.tooltip,
		style: props.style,
		className: props.className,
		'aria-description': props.ariaDescription,
	}

	return {
		baseBindings,
		cssAll,
		cssBase,
		cssBgColor,
		cssDisabled,
		cssHover,
		cssPressed,
		cssRadius,
		cssSize,
		cssTextColor,
		isDisabled,
		isVDanger,
		isVDefault,
		isVPrimary,
		isVSecondary,
		isVSolid,
		isVSubtle,
		isVText,
		props,
	}
}
