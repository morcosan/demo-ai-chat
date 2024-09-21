import { useUiTheme } from '@ds/release'
import { Button } from 'antd'
import { ButtonType } from 'antd/es/button'
import { useMemo } from 'react'
import { ButtonProps } from '../types'
import { useButtonBase } from './_base'

export const AntImpl = (props: ButtonProps) => {
	const { $color, $spacing, isUiLight } = useUiTheme()
	const {
		cssAll,
		dState,
		dVariant,
		isVDanger,
		isVDefault,
		isVItem,
		isVPrimary,
		isVSecondary,
		isVSolid,
		isVText,
		propsBase,
	} = useButtonBase(props)

	const antType = useMemo((): ButtonType => (isVSolid ? 'primary' : 'text'), [dVariant])

	const cssHover = useMemo((): CSS => {
		// AntDesign will try to enforce hover colors
		const cssFn = (color: string, backgroundColor: string) => ({
			'&:not(:disabled):not(.ant-btn-disabled):hover': { color, backgroundColor },
		})
		if (isVPrimary && isUiLight) return cssFn($color['text-inverse'], $color['primary'])
		if (isVPrimary && !isUiLight) return cssFn($color['primary-text-inverse'], $color['primary'])
		if (isVSecondary && isUiLight) return cssFn($color['secondary-text-default'], $color['secondary'])
		if (isVSecondary && !isUiLight) return cssFn($color['secondary-text-inverse'], $color['secondary'])
		if (isVDanger && isVSolid) return cssFn($color['text-inverse'], $color['danger'])
		if (isVDanger && isVText) return cssFn($color['danger'], 'transparent')
		if (isVDefault) return cssFn($color['text-default'], 'transparent')
		return {}
	}, [dVariant, isUiLight])

	const cssWave = useMemo((): CSS => {
		return dState !== 'default' ? { '& .ant-wave': { display: 'none' } } : {}
	}, [dState])

	const cssButton = useMemo(
		(): CSS => ({
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
		}),
		[isUiLight, isVSolid]
	)

	const cssChildren = useMemo(
		(): CSS => ({
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
		}),
		[isVItem, props.loading]
	)

	const propsButton = {
		...propsBase,
		type: antType,
		loading: props.loading,
		disabled: props.disabled,
		css: [...cssAll, cssButton, cssHover, cssChildren, cssWave],
	}

	// AntDesign will wrap only text nodes inside <span>, not all children
	const slot = <span>{props.children}</span>

	return <Button {...propsButton}>{slot}</Button>
}
