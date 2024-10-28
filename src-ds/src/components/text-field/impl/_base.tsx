import { TextFieldProps, TextFieldRef, useUiTheme } from '@ds/release'
import { CSS__ABSOLUTE_OVERLAY, CSS_A11Y_OUTLINE_PROXY, defineRef, Keyboard, useDefaults } from '@utils/release'
import { Ref, useCallback, useRef } from 'react'

export type InputElement = HTMLInputElement & HTMLTextAreaElement

export const useTextFieldBase = (rawProps: TextFieldProps, ref: Ref<TextFieldRef>) => {
	const props = useDefaults(rawProps, {
		size: 'md',
	})
	const { $fontSize, $color, $spacing, $radius } = useUiTheme()
	const inputRef = useRef<InputElement>(null)

	defineRef(ref, () => ({
		focus: () => inputRef.current?.focus(),
		blur: () => inputRef.current?.blur(),
	}))

	const calcHeight: string = (() => {
		if (props.size === 'sm') return $spacing['field-h-sm']
		if (props.size === 'md') return $spacing['field-h-md']
		if (props.size === 'lg') return $spacing['field-h-lg']
		if (props.size === 'xl') return $spacing['field-h-xl']
		return ''
	})()
	const cssHeight: CSS = props.multiline ? {} : { height: calcHeight }
	const cssMinHeight: CSS = { minHeight: calcHeight }

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

	const cssRadiusFn = (borderRadius: string) => ({ borderRadius, '&::before': { borderRadius } })
	const cssRadius: CSS = (() => {
		if (props.size === 'sm') return cssRadiusFn($radius['sm'])
		if (props.size === 'md') return cssRadiusFn($radius['sm'])
		if (props.size === 'lg') return cssRadiusFn($radius['md'])
		if (props.size === 'xl') return cssRadiusFn($radius['md'])
		return {}
	})()

	const isInteractive = !props.readonly && !props.disabled

	const cssA11yOutline = props.multiline
		? { '&:not(:has(textarea:focus))': { outline: 'none' } }
		: { '&:not(:has(input:focus))': { outline: 'none' } }

	const cssWrapper: CSS = {
		...CSS_A11Y_OUTLINE_PROXY,
		...cssA11yOutline,
		...cssHeight,
		...cssMinHeight,
		...cssRadius,
		position: 'relative',
		zIndex: 0,
		display: 'inline-flex',
		alignItems: props.multiline ? 'end' : 'center',
		padding: calcPadding,
		color: $color['text-default'],
		fill: $color['text-placeholder'],
		stroke: $color['text-placeholder'],

		'&::before': {
			...CSS__ABSOLUTE_OVERLAY,
			...cssRadius,
			content: `''`,
			zIndex: -1,
			borderWidth: '1px',
			borderColor: props.readonly ? $color['border-subtle'] : $color['border-default'],
			background: props.readonly ? 'transparent' : $color['bg-field'],
			opacity: props.disabled ? 0.3 : 1,
		},

		'&:hover::before': isInteractive ? { borderColor: $color['border-hover'] } : {},

		'&:has(input:focus), &:has(textarea:focus)': isInteractive
			? {
					fill: $color['text-default'],
					stroke: $color['text-default'],

					'&::before, &:hover::before': {
						borderColor: $color['border-active'],
					},
				}
			: {},
	}

	const cssInput: CSS = {
		...cssMinHeight,
		...cssRadius,

		'--ds-spacing-scrollbar-w': $spacing['xs-1'],
		width: '100%',
		height: '100%',
		maxHeight: `calc(100% + 2 * ${calcPadding})`,
		marginTop: `calc(-1 * ${calcPadding})`,
		marginBottom: `calc(-1 * ${calcPadding})`,
		padding: `${calcPaddingTextY} ${calcPaddingTextX}`,
		background: 'transparent',
		color: $color['text-default'],
		fontSize: props.size === 'sm' ? $fontSize['sm'] : $fontSize['md'],
		opacity: props.disabled ? 0.3 : 1,
		resize: 'none',

		'&:focus-visible': {
			outline: 'none',
		},
		'&::placeholder': {
			color: $color['text-placeholder'],
			opacity: 1,
		},
	}

	const onKeyDown = useCallback(
		(event: ReactKeyboardEvent) => {
			if (event.key === Keyboard.ENTER) {
				props.onSubmit?.(event)
			}
		},
		[props.onSubmit]
	)

	return {
		calcHeight,
		calcPadding,
		calcPaddingTextX,
		calcPaddingTextY,
		cssInput,
		cssWrapper,
		inputRef,
		props,
		onKeyDown,
	}
}
