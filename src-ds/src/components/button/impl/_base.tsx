import { ButtonSize, LinkType, useUiA11y, useUiTheme } from '@ds/release'
import { CSS__ABSOLUTE_OVERLAY, Keyboard } from '@utils/release'
import { KeyboardEvent, MouseEvent, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonProps, ButtonState, ButtonVariant } from '../types'

export const useButtonBase = (props: ButtonProps) => {
	const navigate = useNavigate()
	const { isPointer } = useUiA11y()
	const { $color, $fontSize, $fontWeight, $lineHeight, $spacing, $radius, isUiLight } = useUiTheme()
	const [isPressed, setIsPressed] = useState(false)

	const VARIANTS_SOLID: ButtonVariant[] = [
		'solid-primary',
		'solid-secondary',
		'solid-danger',
		'item-solid-secondary',
	]
	const VARIANTS_ITEM: ButtonVariant[] = ['item-text-default', 'item-text-danger', 'item-solid-secondary']
	const VARIANTS_TEXT: ButtonVariant[] = ['text-default', 'text-danger', 'item-text-default', 'item-text-danger']
	const VARIANTS_PRIMARY: ButtonVariant[] = ['solid-primary']
	const VARIANTS_SECONDARY: ButtonVariant[] = ['solid-secondary', 'item-solid-secondary']
	const VARIANTS_DANGER: ButtonVariant[] = ['solid-danger', 'text-danger', 'item-text-danger']
	const VARIANTS_DEFAULT: ButtonVariant[] = ['text-default', 'item-text-default']

	const dVariant = useMemo((): ButtonVariant => props.variant || 'solid-primary', [props.variant])
	const dSize = useMemo((): ButtonSize => props.size || 'md', [props.size])
	const dState = useMemo((): ButtonState => props.state || 'default', [props.state])
	const dLinkType = useMemo((): LinkType => props.linkType || 'internal', [props.linkType])

	const linkTarget = useMemo(() => (dLinkType === 'internal' ? '_self' : '_blank'), [dLinkType])
	const isDisabled = useMemo(() => props.disabled || props.loading, [props.disabled, props.loading])
	const tabIndex = useMemo(() => (isDisabled ? -1 : 0), [isDisabled])
	const isVDanger = useMemo(() => VARIANTS_DANGER.includes(dVariant), [dVariant])
	const isVDefault = useMemo(() => VARIANTS_DEFAULT.includes(dVariant), [dVariant])
	const isVItem = useMemo(() => VARIANTS_ITEM.includes(dVariant), [dVariant])
	const isVPrimary = useMemo(() => VARIANTS_PRIMARY.includes(dVariant), [dVariant])
	const isVSecondary = useMemo(() => VARIANTS_SECONDARY.includes(dVariant), [dVariant])
	const isVSolid = useMemo(() => VARIANTS_SOLID.includes(dVariant), [dVariant])
	const isVText = useMemo(() => VARIANTS_TEXT.includes(dVariant), [dVariant])

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
		lineHeight: $lineHeight['sm'], // Needed for font descender

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
		if (isVSecondary && isUiLight) return cssTextColorFn($color['secondary-text-default'])
		if (isVSecondary && !isUiLight) return cssTextColorFn($color['secondary-text-inverse'])
		if (isVPrimary && isUiLight) return cssTextColorFn($color['text-inverse'])
		if (isVPrimary && !isUiLight) return cssTextColorFn($color['primary-text-inverse'])
		if (isVDanger && isVSolid && isUiLight) return cssTextColorFn($color['text-inverse'])
		if (isVDanger && isVSolid && !isUiLight) return cssTextColorFn($color['danger-text-inverse'])
		if (isVDanger && !isVSolid) return cssTextColorFn($color['danger'])
		if (isVDefault) return cssTextColorFn($color['text-default'])
		return {}
	}, [dVariant, isUiLight])

	const cssBgColor = useMemo((): CSS => {
		if (isVPrimary) return cssBgColorFn($color['primary'])
		if (isVSecondary) return cssBgColorFn($color['secondary'])
		if (isVDanger && isVSolid) return cssBgColorFn($color['danger'])
		return {}
	}, [dVariant, isUiLight])

	const cssHover = useMemo((): CSS => {
		if (isDisabled) return {}
		if (dState === 'default') {
			return isVText
				? cssHoverFn($color['hover-default'])
				: isVSecondary
					? cssHoverFn($color['hover-1'])
					: cssHoverFn(isUiLight ? $color['hover-2'] : $color['hover-1'])
		}
		return {}
	}, [isDisabled, isUiLight, dVariant, dState])

	const cssPressed = useMemo((): CSS => {
		if (isDisabled || dState === 'selected') return {}
		if (isPressed || dState === 'pressed') {
			return isVText
				? cssPressedFn($color['hover-pressed'])
				: isVSecondary
					? cssPressedFn($color['hover-2'])
					: cssPressedFn(isUiLight ? $color['hover-4'] : $color['hover-2'])
		}
		return {}
	}, [isDisabled, isPressed, isUiLight, isVSecondary, dVariant, dState])

	const cssSize = useMemo((): CSS => {
		if (dSize === 'xs') return cssSizeFn($spacing['button-h-xs'])
		if (dSize === 'sm') return cssSizeFn($spacing['button-h-sm'])
		if (dSize === 'md') return cssSizeFn($spacing['button-h-md'])
		if (dSize === 'lg') return cssSizeFn($spacing['button-h-lg'])
		return {}
	}, [dSize, isUiLight])

	const cssPadding = useMemo((): CSS => {
		if (isVItem) return cssPaddingFn($spacing['button-px-item'])
		if (dSize === 'xs') return cssPaddingFn($spacing['button-px-xs'])
		if (dSize === 'sm') return cssPaddingFn($spacing['button-px-sm'])
		if (dSize === 'md') return cssPaddingFn($spacing['button-px-md'])
		if (dSize === 'lg') return cssPaddingFn($spacing['button-px-lg'])
		return {}
	}, [dSize, isVItem, isUiLight])

	const cssRadius = useMemo((): CSS => {
		if (dSize === 'xs') return cssRadiusFn($radius['sm'])
		if (dSize === 'sm') return cssRadiusFn($radius['sm'])
		if (dSize === 'md') return cssRadiusFn($radius['md'])
		if (dSize === 'lg') return cssRadiusFn($radius['lg'])
		return {}
	}, [dSize, isUiLight])

	const cssFont = useMemo((): CSS => {
		if (isVItem && isVDefault) return { fontWeight: $fontWeight['sm'], fontSize: 'unset' }
		if (isVItem && !isVDefault) return { fontWeight: $fontWeight['md'], fontSize: 'unset' }
		if (dSize === 'xs') return cssFontFn($fontSize['xs'])
		if (dSize === 'sm') return cssFontFn($fontSize['sm'])
		if (dSize === 'md') return cssFontFn($fontSize['md'])
		if (dSize === 'lg') return cssFontFn($fontSize['lg'])
		return {}
	}, [dSize, dVariant, isVItem, isUiLight])

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
			if (isDisabled || dLinkType !== 'external') event.preventDefault()
			if (isDisabled) return

			isPointer && (event.target as HTMLButtonElement).blur()
			props.onClick?.(event)

			if (props.linkHref && dLinkType === 'internal') navigate(props.linkHref)
		},
		[isDisabled, isPointer, dLinkType, props.linkHref]
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
		dLinkType,
		dSize,
		dState,
		dVariant,
		isDisabled,
		isVDanger,
		isVDefault,
		isVItem,
		isVPrimary,
		isVSecondary,
		isVSolid,
		isVText,
		linkTarget,
		propsBase,
	}
}
