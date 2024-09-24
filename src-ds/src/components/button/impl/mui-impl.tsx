import LoadingButton from '@mui/lab/LoadingButton'
import { useMemo } from 'react'
import { ButtonProps } from '../types'
import { useButtonBase } from './_base'

// There is no exported type for variants
type MuiVariant = 'text' | 'outlined' | 'contained'

export const MuiImpl = (rawProps: ButtonProps) => {
	const { propsBase, cssAll, isDisabled, isVItem, isVSolid, props } = useButtonBase(rawProps)

	const muiVariant = useMemo((): MuiVariant => (isVSolid ? 'contained' : 'text'), [props.variant])

	const cssButton: CSS = {
		minWidth: 'unset',
		paddingTop: '0',
		paddingBottom: '0',
		textTransform: 'none',
		outline: 'revert',
		opacity: 1,
	}

	const cssChildren = useMemo(
		(): CSS => ({
			'& .MuiLoadingButton-label': {
				display: 'flex',
				alignItems: 'center',
				justifyContent: isVItem ? 'unset' : 'center',
				width: '100%',
				height: '100%',
				pointerEvents: 'none',
				color: props.loading ? 'transparent' : 'currentColor',
				fill: props.loading ? 'transparent' : 'currentColor',
				stroke: props.loading ? 'transparent' : 'currentColor',
			},
		}),
		[props.variant, props.loading]
	)

	const propsButton = {
		...propsBase,
		variant: muiVariant,
		disabled: isDisabled,
		loading: props.loading,
		disableElevation: true,
		disableRipple: props.highlight !== 'default',
		sx: [...cssAll, cssButton, cssChildren],
	}

	return <LoadingButton {...propsButton}>{props.children}</LoadingButton>
}
