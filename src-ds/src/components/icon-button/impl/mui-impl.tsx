import LoadingButton from '@mui/lab/LoadingButton'
import { IconButtonProps } from '../_types'
import { useIconButtonBase } from './_base'

// There is no exported type for variants
type MuiVariant = 'text' | 'outlined' | 'contained'

export const MuiImpl = (rawProps: IconButtonProps) => {
	const { baseBindings, cssAll, isDisabled, isVSolid, props } = useIconButtonBase(rawProps)

	const cssButton: CSS = {
		padding: '0',
		textTransform: 'none',
		outline: 'revert',
		opacity: 1,
	}

	const cssChildren: CSS = {
		'& .MuiLoadingButton-label': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			height: '100%',
			pointerEvents: 'none',
			color: props.loading ? 'transparent' : 'currentColor',
			fill: props.loading ? 'transparent' : 'currentColor',
			stroke: props.loading ? 'transparent' : 'currentColor',
		},
	}

	const bindings = {
		...baseBindings,
		variant: (isVSolid ? 'contained' : 'text') satisfies MuiVariant,
		disabled: isDisabled,
		loading: props.loading,
		disableElevation: true,
		disableRipple: props.pressed,
		sx: [...cssAll, cssButton, cssChildren],
	}

	return <LoadingButton {...bindings}>{props.children}</LoadingButton>
}
