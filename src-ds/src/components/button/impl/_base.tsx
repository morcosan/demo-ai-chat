import { CSS__ABSOLUTE_OVERLAY, Keyboard, useUiA11y, useUiTheme } from '@ds/release'
import { KeyboardEvent, MouseEvent, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonProps, ButtonVariant } from '../types'

export const useButtonBase = (props: ButtonProps) => {
	const navigate = useNavigate()
	const { isPointer } = useUiA11y()
	const { $color, $fontSize, $fontWeight, $spacing, $radius, isLight } = useUiTheme()
	const [isPressed, setIsPressed] = useState(false)

	const VARIANTS_SOLID: ButtonVariant[] = ['solid-primary', 'solid-secondary', 'solid-danger']
	const VARIANTS_ITEM: ButtonVariant[] = ['item-text-default', 'item-text-danger']
	const VARIANTS_TEXT: ButtonVariant[] = ['text-default', 'text-danger', 'item-text-default', 'item-text-danger']
	const VARIANTS_PRIMARY: ButtonVariant[] = ['solid-primary']
	const VARIANTS_SECONDARY: ButtonVariant[] = ['solid-secondary']
	const VARIANTS_DANGER: ButtonVariant[] = ['solid-danger', 'text-danger', 'item-text-danger']
	const VARIANTS_DEFAULT: ButtonVariant[] = ['text-default', 'item-text-default']

	const variant = useMemo(() => props.variant || 'solid-primary', [props.variant])
	const size = useMemo(() => props.size || 'md', [props.size])
	const linkType = useMemo(() => props.linkType || 'internal', [props.linkType])
	const linkTarget = useMemo(() => (linkType === 'internal' ? '_self' : '_blank'), [linkType])
	const isDisabled = useMemo(() => props.disabled || props.loading, [props.disabled, props.loading])
	const tabIndex = useMemo(() => (isDisabled ? -1 : 0), [isDisabled])
	const isVDanger = useMemo(() => VARIANTS_DANGER.includes(variant), [variant])
	const isVDefault = useMemo(() => VARIANTS_DEFAULT.includes(variant), [variant])
	const isVItem = useMemo(() => VARIANTS_ITEM.includes(variant), [variant])
	const isVPrimary = useMemo(() => VARIANTS_PRIMARY.includes(variant), [variant])
	const isVSecondary = useMemo(() => VARIANTS_SECONDARY.includes(variant), [variant])
	const isVSolid = useMemo(() => VARIANTS_SOLID.includes(variant), [variant])
	const isVText = useMemo(() => VARIANTS_TEXT.includes(variant), [variant])

	const cssTextColorFn = (color: string) => ({ color, fill: color, stroke: color })
	const cssBgColorFn = (backgroundColor: string) => ({ backgroundColor })
	const cssSizeFn = (height: string) => ({ height, minHeight: height })
	const cssPaddingFn = (padding: string) => ({ paddingLeft: padding, paddingRight: padding })
	const cssFontFn = (fontSize: string) => ({ fontSize, fontWeight: $fontWeight['md'] })
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
		lineHeight: 1,

		'&::before': {
			...CSS__ABSOLUTE_OVERLAY,
			content: `''`,
			zIndex: -1,
		},
	}

	const cssDisabled = useMemo(
		(): CSS => ({
			opacity: props.disabled ? 0.3 : 1,
			pointerEvents: isDisabled ? 'none' : 'unset',
		}),
		[isDisabled, props.disabled]
	)

	const cssTextColor = useMemo((): CSS => {
		if (isVSecondary && isLight) return cssTextColorFn($color['secondary-text-default'])
		if (isVSecondary && !isLight) return cssTextColorFn($color['secondary-text-inverse'])
		if (isVPrimary && isLight) return cssTextColorFn($color['text-inverse'])
		if (isVPrimary && !isLight) return cssTextColorFn($color['primary-text-inverse'])
		if (isVDanger && isVSolid && isLight) return cssTextColorFn($color['text-inverse'])
		if (isVDanger && isVSolid && !isLight) return cssTextColorFn($color['danger-text-inverse'])
		if (isVDanger && !isVSolid) return cssTextColorFn($color['danger'])
		if (isVDefault) return cssTextColorFn($color['text-default'])
		return {}
	}, [variant, isLight])

	const cssBgColor = useMemo((): CSS => {
		if (isVPrimary) return cssBgColorFn($color['primary'])
		if (isVSecondary) return cssBgColorFn($color['secondary'])
		if (isVDanger && isVSolid) return cssBgColorFn($color['danger'])
		return {}
	}, [variant])

	const cssHover = useMemo((): CSS => {
		if (!isDisabled) {
			return isVSecondary
				? cssHoverFn($color['hover-1'])
				: isVSolid
					? cssHoverFn(isLight ? $color['hover-2'] : $color['hover-1'])
					: cssHoverFn(isLight ? $color['hover-1'] : $color['hover-2'])
		}
		return {}
	}, [isDisabled, isLight, variant])

	const cssPressed = useMemo((): CSS => {
		if (!isDisabled && (isPressed || props.pressed)) {
			return isVSecondary
				? cssPressedFn($color['hover-2'])
				: isVSolid
					? cssPressedFn(isLight ? $color['hover-4'] : $color['hover-2'])
					: cssPressedFn(isLight ? $color['hover-2'] : $color['hover-4'])
		}
		return {}
	}, [isDisabled, isPressed, isLight, isVSecondary, variant, props.pressed])

	const cssSize = useMemo((): CSS => {
		if (size === 'xs') return cssSizeFn($spacing['button-h-xs'])
		if (size === 'sm') return cssSizeFn($spacing['button-h-sm'])
		if (size === 'md') return cssSizeFn($spacing['button-h-md'])
		if (size === 'lg') return cssSizeFn($spacing['button-h-lg'])
		return {}
	}, [size])

	const cssPadding = useMemo((): CSS => {
		if (isVItem) return cssPaddingFn($spacing['button-px-item'])
		if (size === 'xs') return cssPaddingFn($spacing['button-px-xs'])
		if (size === 'sm') return cssPaddingFn($spacing['button-px-sm'])
		if (size === 'md') return cssPaddingFn($spacing['button-px-md'])
		if (size === 'lg') return cssPaddingFn($spacing['button-px-lg'])
		return {}
	}, [size, isVItem])

	const cssRadius = useMemo((): CSS => {
		if (size === 'xs') return cssRadiusFn($radius['sm'])
		if (size === 'sm') return cssRadiusFn($radius['sm'])
		if (size === 'md') return cssRadiusFn($radius['md'])
		if (size === 'lg') return cssRadiusFn($radius['lg'])
		return {}
	}, [size])

	const cssFont = useMemo((): CSS => {
		if (isVItem && isVDefault) return { fontWeight: $fontWeight['sm'], fontSize: 'unset' }
		if (isVItem && !isVDefault) return { fontWeight: $fontWeight['md'], fontSize: 'unset' }
		if (size === 'xs') return cssFontFn($fontSize['xs'])
		if (size === 'sm') return cssFontFn($fontSize['sm'])
		if (size === 'md') return cssFontFn($fontSize['md'])
		if (size === 'lg') return cssFontFn($fontSize['lg'])
		return {}
	}, [size, variant, isVItem])

	const cssAll = [
		cssBase,
		cssBgColor,
		cssDisabled,
		cssFont,
		cssHover,
		cssPadding,
		cssPressed,
		cssRadius,
		cssSize,
		cssTextColor,
	]

	const onClick = useCallback(
		(event: MouseEvent) => {
			if (isDisabled || linkType !== 'external') event.preventDefault()
			if (isDisabled) return

			isPointer && (event.target as HTMLButtonElement).blur()
			props.onClick?.(event)

			if (props.linkHref && linkType === 'internal') navigate(props.linkHref)
		},
		[isDisabled, isPointer, linkType, props.linkHref]
	)

	const onMouseDown = () => setIsPressed(true)
	const onMouseLeave = () => setIsPressed(false)
	const onMouseUp = () => setIsPressed(false)

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === Keyboard.SPACE || event.key === Keyboard.ENTER) {
			event.preventDefault()
			setIsPressed(true)
		}
	}

	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key === Keyboard.SPACE || event.key === Keyboard.ENTER) {
			const button = event.target as HTMLButtonElement
			button.click()
			setIsPressed(false)
		}
	}

	const propsBase = useMemo(() => {
		const base: any = {
			title: props.tooltip,
			style: props.style,
			tabIndex,
			onClick,
			onMouseDown,
			onMouseLeave,
			onMouseUp,
			onKeyDown,
			onKeyUp,
		}
		if (props.className) {
			base.className = props.className
		}
		if (props.linkHref) {
			base.href = props.linkHref
			base.target = linkTarget
			base.rel = 'noopener noreferrer'
		}
		return base
	}, [linkTarget, tabIndex, props.linkHref, props.tooltip, props.className, props.style, onClick])

	return {
		cssAll,
		cssBase,
		cssBgColor,
		cssDisabled,
		cssFont,
		cssHover,
		cssPadding,
		cssPressed,
		cssRadius,
		cssSize,
		cssTextColor,
		isDisabled,
		isVDanger,
		isVDefault,
		isVItem,
		isVPrimary,
		isVSecondary,
		isVSolid,
		isVText,
		linkTarget,
		linkType,
		propsBase,
		size,
		variant,
	}
}
