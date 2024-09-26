// noinspection DuplicatedCode

import { useUiTheme } from '@ds/release'
import { Button } from 'antd'
import { ButtonType } from 'antd/es/button'
import { ButtonProps } from '../_types'
import { useButtonBase } from './_base'

export const AntImpl = (rawProps: ButtonProps) => {
	const { $color, $spacing, isUiLight } = useUiTheme()
	const buttonBase = useButtonBase(rawProps)
	const { cssAll, isVDanger, isVDefault, isVItem, isVPrimary, isVSecondary, isVSolid, isVText } = buttonBase
	const { props, baseBindings } = buttonBase

	const cssHover: CSS = (() => {
		// AntDesign will try to enforce hover colors
		const cssFn = (color: string, backgroundColor: string) => ({
			'&:not(:disabled):not(.ant-btn-disabled):hover': { color, backgroundColor },
		})
		if (isVPrimary && isUiLight) return cssFn($color['text-inverse'], $color['primary'])
		if (isVPrimary && !isUiLight) return cssFn($color['primary-text-inverse'], $color['primary'])
		if (isVSecondary && isUiLight) return cssFn($color['secondary-text-default'], $color['secondary'])
		if (isVSecondary && !isUiLight) return cssFn($color['secondary-text-inverse'], $color['secondary'])
		if (isVDanger && isVSolid && isUiLight) return cssFn($color['text-inverse'], $color['danger'])
		if (isVDanger && isVSolid && !isUiLight) return cssFn($color['danger-text-inverse'], $color['danger'])
		if (isVDanger && isVText) return cssFn($color['danger'], 'transparent')
		if (isVDefault) return cssFn($color['text-default'], 'transparent')
		return {}
	})()

	const cssWave: CSS = props.highlight !== 'default' ? { '& .ant-wave': { display: 'none' } } : {}

	const cssButton: CSS = {
		opacity: 1,
		fill: 'currentColor',
		stroke: 'currentColor',

		'&:not(:disabled):focus-visible': {
			outline: 'revert',
			outlineOffset: $spacing['a11y-outline'],
		},

		'&:disabled, &.ant-btn-disabled': {
			color: $color['text-default'],
			background: isVSolid ? (isUiLight ? $color['black-glass-3'] : $color['white-glass-3']) : 'unset',
			opacity: '0.4',
		},
	}

	const cssChildren: CSS = {
		// AntDesign will force 'display: inline-block' on first <span> child
		// CSS for children must be applied via '& > span:last-child'
		'& > span:last-child': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: isVItem ? 'unset' : 'center',
			width: '100%',
			height: '100%',
			pointerEvents: 'none',
		},
	}

	const bindings = {
		...baseBindings,
		type: (isVSolid ? 'primary' : 'text') satisfies ButtonType,
		loading: props.loading,
		disabled: props.disabled,
		css: [...cssAll, cssButton, cssHover, cssChildren, cssWave],
	}

	// AntDesign will wrap only text nodes inside <span>, not all children
	const slot = <span>{props.children}</span>

	return <Button {...bindings}>{slot}</Button>
}
