// noinspection DuplicatedCode

import { useUiTheme } from '@ds/release'
import { Button } from 'antd'
import { ButtonType } from 'antd/es/button'
import { ButtonProps } from '../_types'
import { useButtonBase } from './_base'

export const AntImpl = (rawProps: ButtonProps) => {
	const { $color, $spacing, isUiLight } = useUiTheme()
	const {
		baseBindings,
		cssAll,
		cssBase,
		isVDanger,
		isVDefault,
		isVGhost,
		isVItem,
		isVPrimary,
		isVSecondary,
		isVSolid,
		isVText,
		props,
	} = useButtonBase(rawProps)

	const cssHover: CSS = (() => {
		// AntDesign will try to enforce hover colors
		const cssFn = (color: string, backgroundColor: string) => ({
			'&:not(:disabled):not(.ant-btn-disabled):hover': { color, backgroundColor },
		})
		if (isVGhost) {
			if (isVPrimary) return cssFn($color['primary-page-text'], 'transparent')
			if (isVSecondary) return cssFn($color['secondary-page-text'], 'transparent')
			if (isVDanger) return cssFn($color['danger'], 'transparent')
		}
		if (isVPrimary) return cssFn($color['primary-button-text'], $color['primary-button-bg'])
		if (isVSecondary) return cssFn($color['secondary-button-text'], $color['secondary-button-bg'])
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

		'&.ant-btn-default': {
			background: 'unset',

			'&:not(:disabled):hover': {
				borderColor: 'unset',
			},
		},

		'&::before': {
			...(cssBase['&::before'] as CSS),
			top: '-1px',
			left: '-1px',
			right: '-1px',
			bottom: '-1px',
		},

		'&:not(:disabled):focus-visible': {
			outline: 'revert',
			outlineOffset: $spacing['a11y-outline'],
		},

		'&:disabled, &.ant-btn-disabled': {
			color: $color['text-default'],
			background: isVSolid ? (isUiLight ? $color['black-glass-5'] : $color['white-glass-5']) : 'unset',
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
		type: (isVSolid ? 'primary' : isVGhost ? 'default' : 'text') satisfies ButtonType,
		loading: props.loading,
		disabled: props.disabled,
		css: [...cssAll, cssButton, cssHover, cssChildren, cssWave],
	}

	// AntDesign will wrap only text nodes inside <span>, not all children
	const slot = <span>{props.children}</span>

	return <Button {...bindings}>{slot}</Button>
}
