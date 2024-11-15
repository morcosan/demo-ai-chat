import { useUiTheme } from '@ds/release'
import { CSS__ABSOLUTE_OVERLAY, CSS_A11Y_OUTLINE_PROXY, useDefaults } from '@utils/release'
import { useState } from 'react'
import { SelectFieldProps } from './_types'

export const useSelectFieldBase = (rawProps: SelectFieldProps) => {
	const props = useDefaults(rawProps, {
		keyLabel: 'label',
		keyValue: 'value',
		variant: 'default',
		size: 'md',
		popupPos: 'bottom',
	})
	const { $color, $fontSize, $fontWeight, $radius, $spacing, $shadow, $zIndex } = useUiTheme()
	const [isOpened, setIsOpened] = useState(false)

	const isInteractive = !props.readonly && !props.disabled && !props.loading

	const calcPadding: string = (() => {
		if (props.size === 'sm') return `calc((${$spacing['field-h-sm']} - ${$spacing['button-h-xs']}) / 2)`
		if (props.size === 'md') return `calc((${$spacing['field-h-md']} - ${$spacing['button-h-sm']}) / 2)`
		if (props.size === 'lg') return `calc((${$spacing['field-h-lg']} - ${$spacing['button-h-sm']}) / 2)`
		if (props.size === 'xl') return `calc((${$spacing['field-h-xl']} - ${$spacing['button-h-md']}) / 2)`
		return ''
	})()
	const calcPaddingTextX: string = (() => {
		if (props.size === 'sm') return $spacing['xs-2']
		if (props.size === 'md') return $spacing['xs-3']
		if (props.size === 'lg') return $spacing['xs-3']
		if (props.size === 'xl') return $spacing['xs-4']
		return ''
	})()
	const calcPaddingTextY: string = (() => {
		if (props.size === 'sm') return `calc(1.4 * ${calcPadding})`
		if (props.size === 'md') return `calc(2 * ${calcPadding})`
		if (props.size === 'lg') return `calc(1.5 * ${calcPadding})`
		if (props.size === 'xl') return `calc(2 * ${calcPadding})`
		return ''
	})()

	const calcHeight: string = (() => {
		if (props.size === 'sm') return $spacing['field-h-sm']
		if (props.size === 'md') return $spacing['field-h-md']
		if (props.size === 'lg') return $spacing['field-h-lg']
		if (props.size === 'xl') return $spacing['field-h-xl']
		return ''
	})()
	const cssHeight: CSS = { height: calcHeight }

	const cssRadius: CSS = (() => {
		if (props.size === 'sm') return { borderRadius: $radius['sm'] }
		if (props.size === 'md') return { borderRadius: $radius['sm'] }
		if (props.size === 'lg') return { borderRadius: $radius['md'] }
		if (props.size === 'xl') return { borderRadius: $radius['md'] }
		return {}
	})()

	const colorBorder = props.subtle
		? 'transparent'
		: props.invalid
			? $color['danger-page-text']
			: props.readonly
				? $color['border-subtle']
				: $color['border-default']

	const cssA11yOutline: CSS = { '&:not(:has(input:focus))': { outline: 'none' } }

	const colorBorderActive = (() => {
		if (props.invalid) return $color['danger-page-text']
		if (props.variant === 'default') return $color['border-active']
		if (props.variant === 'primary') return $color['primary-page-text']
		if (props.variant === 'secondary') return $color['secondary-page-text']
		return ''
	})()

	const cssFieldFocus: CSS = {
		fill: $color['text-default'],
		stroke: $color['text-default'],
		borderWidth: '2px',
		borderColor: colorBorderActive,
	}

	const cssFieldBase: CSS = {
		...CSS_A11Y_OUTLINE_PROXY,
		...cssA11yOutline,
		borderWidth: '1px',
		borderColor: colorBorder,
		background: props.readonly || props.subtle ? 'transparent' : $color['bg-field'],
		opacity: props.disabled ? 0.3 : 1,
		color: $color['text-default'],
		fill: $color['text-placeholder'],
		stroke: $color['text-placeholder'],

		'&:hover': isInteractive
			? { borderColor: props.invalid ? $color['danger-page-text'] : $color['border-hover'] }
			: {},

		'&:has(input:focus)': isInteractive ? cssFieldFocus : {},
	}

	const cssInput: CSS = {
		...CSS__ABSOLUTE_OVERLAY,
		...cssRadius,

		'--ds-spacing-scrollbar-w': $spacing['xs-1'],
		padding: `${calcPaddingTextY} calc(${calcPaddingTextX} + ${calcPadding})`,
		paddingRight: calcHeight,
		background: 'transparent',
		color: $color['text-default'],
		fontSize: props.size === 'sm' ? $fontSize['sm'] : $fontSize['md'],
		opacity: isOpened ? (props.disabled ? 0.3 : 1) : 0,
		resize: 'none',

		'&:focus-visible': {
			outline: 'none',
		},
		'&::placeholder': {
			color: $color['text-placeholder'],
			opacity: 1,
		},
	}

	const cssArrow: CSS = {
		position: 'absolute',
		top: 0,
		right: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: calcHeight,
		height: calcHeight,
		transform: isOpened ? 'rotate(180deg)' : 'rotate(0deg)',
		transition: 'transform 0.3s ease',
		color: props.subtle ? $color['text-subtle'] : undefined,
		pointerEvents: 'none',
	}

	const cssValueOption: CSS = {
		display: 'flex',
		alignItems: 'center',
		height: '100%',
		padding: `0 calc(${calcPaddingTextX} + ${calcPadding})`,
		paddingRight: calcHeight,
		opacity: isOpened ? 0 : 1,
		pointerEvents: 'none',
	}

	const calcExtraPadding = $spacing['xs-1']

	const cssPopup: CSS = {
		position: 'absolute',
		top: props.popupPos === 'bottom' ? `calc(${calcHeight} + 2px)` : undefined,
		bottom: props.popupPos === 'top' ? `calc(${calcHeight} + 2px)` : undefined,
		left: `calc(-1 * ${calcExtraPadding})`,
		right: `calc(-1 * ${calcExtraPadding})`,
		display: isOpened ? 'block' : 'none',
		maxHeight: $spacing['xl-0'],
		overflowY: 'auto',
		backgroundColor: $color['bg-popup'],
		border: `1px solid ${$color['border-shadow']}`,
		borderRadius: $radius['sm'],
		boxShadow: $shadow['md'],
		zIndex: $zIndex['popup'],
	}

	const cssOptionList: CSS = {
		padding: `${$spacing['xs-3']} calc(${calcExtraPadding} / 2 + ${calcPadding})`,
	}

	const cssOption: CSS = {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		minHeight: $spacing['button-h-md'],
		padding: `${$spacing['xs-1']} calc(${calcExtraPadding} / 2 + ${calcPaddingTextX})`,
		borderRadius: $radius['sm'],
		cursor: 'pointer',
		overflow: 'hidden',

		'&:hover::before, &[data-current=true]::before': {
			...CSS__ABSOLUTE_OVERLAY,
			content: '""',
			backgroundColor: $color['hover-text-default'],
			zIndex: 1,
		},

		'&[aria-selected=true]': {
			backgroundColor: $color['secondary-button-bg'],
			color: $color['secondary-button-text'],
			fontWeight: $fontWeight['md'],
		},
	}
	const cssWrapper: CSS = {
		position: 'relative',
		display: 'inline-block',
		width: props.subtle ? (isOpened ? '100%' : 'fit-content') : undefined,
		verticalAlign: 'middle',
	}

	return {
		cssArrow,
		cssFieldBase,
		cssFieldFocus,
		cssHeight,
		cssInput,
		cssOption,
		cssOptionList,
		cssPopup,
		cssRadius,
		cssValueOption,
		cssWrapper,
		isOpened,
		isInteractive,
		props,
		setIsOpened,
	}
}
