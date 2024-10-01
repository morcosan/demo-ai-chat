// noinspection DuplicatedCode

import { useUiTheme } from '@ds/release'
import { CSS__ABSOLUTE_OVERLAY, useDefaults } from '@utils/release'
import { useClickable } from '../../_shared/clickable'
import { IconButtonProps, IconButtonVariant } from '../_types'

type Variant = IconButtonVariant | undefined

const VARIANTS_SOLID: Variant[] = ['solid-primary', 'solid-secondary', 'solid-danger']
const VARIANTS_TEXT: Variant[] = ['text-default', 'text-danger']
const VARIANTS_PRIMARY: Variant[] = ['solid-primary']
const VARIANTS_SECONDARY: Variant[] = ['solid-secondary']
const VARIANTS_DANGER: Variant[] = ['solid-danger', 'text-danger']
const VARIANTS_DEFAULT: Variant[] = ['text-default']

export const useIconButtonBase = (rawProps: IconButtonProps) => {
	const props = useDefaults<IconButtonProps>(rawProps, {
		size: 'md',
		variant: 'text-default',
		linkType: 'internal',
	})
	const { $color, $spacing, $radius, isUiLight } = useUiTheme()
	const { bindings, isDisabled, isPressed } = useClickable(props)

	const isVDanger = VARIANTS_DANGER.includes(props.variant)
	const isVDefault = VARIANTS_DEFAULT.includes(props.variant)
	const isVPrimary = VARIANTS_PRIMARY.includes(props.variant)
	const isVSecondary = VARIANTS_SECONDARY.includes(props.variant)
	const isVSolid = VARIANTS_SOLID.includes(props.variant)
	const isVText = VARIANTS_TEXT.includes(props.variant)

	const cssTextColorFn = (color: string) => ({ color, fill: color, stroke: color })
	const cssBgColorFn = (backgroundColor: string) => ({ backgroundColor })
	const cssSizeFn = (size: string) => ({ height: size, minHeight: size, width: size, minWidth: size })
	const cssRadiusFn = (borderRadius: string) => ({ borderRadius, '&::before': { borderRadius } })
	const cssPressedFn = (color: string) => ({ '&::before': { backgroundColor: color + ' !important' } })
	const cssHoverFn = (backgroundColor: string) => ({
		'&:hover::before': { backgroundColor },
		'&:focus::before': { backgroundColor },
	})

	const cssBase: CSS = {
		position: 'relative',
		zIndex: 0,
		border: '0 solid transparent',

		'&::before': {
			...CSS__ABSOLUTE_OVERLAY,
			content: `''`,
			zIndex: -1,
		},
	}

	const cssDisabled: CSS = {
		opacity: props.disabled ? 0.3 : 1,
		pointerEvents: isDisabled ? 'none' : 'unset',
	}

	const cssTextColor: CSS = (() => {
		if (isVSecondary && isUiLight) return cssTextColorFn($color['secondary-text-default'])
		if (isVSecondary && !isUiLight) return cssTextColorFn($color['secondary-text-inverse'])
		if (isVPrimary && isUiLight) return cssTextColorFn($color['text-inverse'])
		if (isVPrimary && !isUiLight) return cssTextColorFn($color['primary-text-inverse'])
		if (isVDanger && isVSolid && isUiLight) return cssTextColorFn($color['text-inverse'])
		if (isVDanger && isVSolid && !isUiLight) return cssTextColorFn($color['danger-text-inverse'])
		if (isVDanger && !isVSolid) return cssTextColorFn($color['danger'])
		if (isVDefault) return cssTextColorFn($color['text-default'])
		return {}
	})()

	const cssBgColor: CSS = (() => {
		if (isVPrimary) return cssBgColorFn($color['primary'])
		if (isVSecondary) return cssBgColorFn($color['secondary'])
		if (isVDanger && isVSolid) return cssBgColorFn($color['danger'])
		return {}
	})()

	const cssHover: CSS = (() => {
		if (isDisabled) return {}
		if (!props.pressed) {
			return isVText
				? cssHoverFn($color['hover-default'])
				: isVSecondary
					? cssHoverFn($color['hover-1'])
					: cssHoverFn(isUiLight ? $color['hover-2'] : $color['hover-1'])
		}
		return {}
	})()

	const cssPressed: CSS = (() => {
		if (isDisabled) return {}
		if (isPressed || props.pressed) {
			return isVText
				? cssPressedFn($color['hover-pressed'])
				: isVSecondary
					? cssPressedFn($color['hover-2'])
					: cssPressedFn(isUiLight ? $color['hover-4'] : $color['hover-2'])
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
		isVText,
		props,
	}
}
