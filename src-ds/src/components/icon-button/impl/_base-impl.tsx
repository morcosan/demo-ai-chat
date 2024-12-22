import { useUiTheme } from '@ds/release'
import { useDefaults } from '@utils/release'
import { useBaseButton } from '../../_shared/use-base-button'
import { IconButtonProps } from '../_types'

export const useBaseImpl = (rawProps: IconButtonProps) => {
	const props = useDefaults<IconButtonProps>(rawProps, {
		size: 'md',
		variant: 'text-default',
		linkType: 'internal',
	})
	const { $fontSize, $radius } = useUiTheme()
	const {
		baseBindings,
		baseTokens,
		cssBaseButton,
		cssBaseChildren,
		isNoop,
		isPressed,
		isVDanger,
		isVDefault,
		isVGhost,
		isVItem,
		isVPrimary,
		isVSecondary,
		isVSolid,
		isVSubtle,
		isVText,
	} = useBaseButton({ ...props, highlight: props.pressed ? 'pressed' : 'default' })

	const tokens = {
		...baseTokens,
		borderRadius: isVText ? $radius['full'] : $radius['sm'],
	}

	const cssButton: CSS = {
		...cssBaseButton,
		width: tokens.size,
		minWidth: tokens.size,
		padding: 0,
		borderRadius: tokens.borderRadius,
		fontSize: $fontSize['md'],

		'&::before, &::after': {
			...(cssBaseButton['&::before, &::after'] as CSS),
			borderRadius: tokens.borderRadius,
		},
	}

	return {
		bindings: { ...baseBindings, css: cssButton },
		cssButton,
		cssChildren: cssBaseChildren,
		isNoop,
		isPressed,
		isVDanger,
		isVDefault,
		isVGhost,
		isVItem,
		isVPrimary,
		isVSecondary,
		isVSolid,
		isVSubtle,
		isVText,
		props,
		tokens,
	}
}
