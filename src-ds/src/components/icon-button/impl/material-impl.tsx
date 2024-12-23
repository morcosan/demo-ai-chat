// noinspection DuplicatedCode

import LoadingButton from '@mui/lab/LoadingButton'
import { CSS__ABSOLUTE_CENTER } from '@utils/release'
import { IconButtonProps } from '../_types'
import { useBaseImpl } from './_base-impl'

export const MaterialImpl = (rawProps: IconButtonProps) => {
	const { bindings, cssButton, cssChildren, isNoop, props, tokens } = useBaseImpl(rawProps)

	const cssMaterial: CSS = {
		...cssButton,
		textTransform: 'none',
		outline: 'revert',

		'&.Mui-disabled': {
			pointerEvents: 'unset',
			cursor: tokens.cursor,
			backgroundColor: tokens.bgColor,
			border: `1px solid ${tokens.borderColor}`,
		},

		'& .MuiLoadingButton-label': cssChildren,

		'& > span:first-of-type': props.loading
			? { color: 'currentColor', ...CSS__ABSOLUTE_CENTER }
			: { color: 'currentColor' },
	}

	const fixButtonAttrs = (elem: HTMLButtonElement | null) => {
		elem?.setAttribute('tabindex', '0')
		elem?.removeAttribute('disabled')
	}

	bindings.loading = props.loading
	bindings.disableElevation = true
	bindings.disableRipple = isNoop || props.pressed
	bindings.css = cssMaterial

	return (
		<LoadingButton {...bindings} ref={fixButtonAttrs}>
			{props.children}
		</LoadingButton>
	)
}
