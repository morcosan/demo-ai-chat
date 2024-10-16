import LoadingButton from '@mui/lab/LoadingButton'
import { ButtonProps } from '../_types'
import { useButtonBase } from './_base'

// There is no exported type for variants
type MuiVariant = 'text' | 'outlined' | 'contained'

export const MuiImpl = (rawProps: ButtonProps) => {
	const { baseBindings, cssAll, cssBase, isDisabled, isVGhost, isVItem, isVSolid, props } = useButtonBase(rawProps)

	const cssButton: CSS = {
		minWidth: 'unset',
		paddingTop: '0',
		paddingBottom: '0',
		textTransform: 'none',
		outline: 'revert',
		opacity: 1,
		borderWidth: isDisabled ? 0 : '1px',

		'&::before': {
			...(cssBase['&::before'] as CSS),
			top: isDisabled ? 0 : '-1px',
			left: isDisabled ? 0 : '-1px',
			right: isDisabled ? 0 : '-1px',
			bottom: isDisabled ? 0 : '-1px',
		},
	}

	const cssChildren: CSS = {
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
	}

	const buttonBindings = {
		...baseBindings,
		variant: (isVSolid ? 'contained' : isVGhost ? 'outlined' : 'text') satisfies MuiVariant,
		disabled: isDisabled,
		loading: props.loading,
		disableElevation: true,
		disableRipple: props.highlight !== 'default',
		sx: [...cssAll, cssButton, cssChildren],
	}

	return <LoadingButton {...buttonBindings}>{props.children}</LoadingButton>
}
