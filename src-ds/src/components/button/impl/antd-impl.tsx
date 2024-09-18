import { useUiTheme } from '@ds/release'
import { Button } from 'antd'
import { ButtonType } from 'antd/es/button'
import { useMemo } from 'react'
import { ButtonProps } from '../types'
import { useButtonBase } from './_base'

export const AntdImpl = (props: ButtonProps) => {
	const { $color, $spacing, isLight } = useUiTheme()
	const {
		cssAll,
		isVDanger,
		isVDefault,
		isVItem,
		isVPrimary,
		isVSecondary,
		isVSolid,
		isVText,
		propsBase,
		variant,
	} = useButtonBase(props)

	const antdType = useMemo((): ButtonType => (isVSolid ? 'primary' : 'text'), [variant])

	const cssHover = useMemo((): CSS => {
		// AntDesign will try to enforce hover colors
		const cssFn = (color: string, backgroundColor: string) => ({
			'&:not(:disabled):not(.ant-btn-disabled):hover': { color, backgroundColor },
		})
		if (isVPrimary && isLight) return cssFn($color['text-inverse'], $color['primary'])
		if (isVPrimary && !isLight) return cssFn($color['primary-text-inverse'], $color['primary'])
		if (isVSecondary && isLight) return cssFn($color['secondary-text-default'], $color['secondary'])
		if (isVSecondary && !isLight) return cssFn($color['secondary-text-inverse'], $color['secondary'])
		if (isVDanger && isVSolid) return cssFn($color['text-inverse'], $color['danger'])
		if (isVDanger && isVText) return cssFn($color['danger'], 'transparent')
		if (isVDefault) return cssFn($color['text-default'], 'transparent')
		return {}
	}, [variant, isLight])

	const cssButton = useMemo(
		(): CSS => ({
			opacity: 1,
			fill: 'currentColor',
			stroke: 'currentColor',

			'&:not(:disabled):focus-visible': {
				outline: 'revert',
				outlineOffset: $spacing['outline'],
			},

			'&:disabled, &.ant-btn-disabled': {
				color: $color['text-default'],
				background: isVSolid ? (isLight ? $color['black-glass-3'] : $color['white-glass-3']) : 'unset',
				opacity: '0.4',
			},
		}),
		[isLight, isVSolid]
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
		type: antdType,
		loading: props.loading,
		disabled: props.disabled,
		css: [...cssAll, cssButton, cssHover, cssChildren],
	}

	// AntDesign will wrap only text nodes inside <span>, not all children
	const slot = <span>{props.children}</span>

	return <Button {...propsButton}>{slot}</Button>
}
