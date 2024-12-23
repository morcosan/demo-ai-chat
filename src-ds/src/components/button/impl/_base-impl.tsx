import { useUiTheme } from '@ds/release'
import { useDefaults } from '@utils/release'
import { useBaseButton } from '../../_shared/use-base-button'
import { ButtonProps } from '../_types'

export const useBaseImpl = (rawProps: ButtonProps) => {
	const props = useDefaults<ButtonProps>(rawProps, {
		size: 'md',
		variant: 'solid-primary',
		highlight: 'default',
		linkType: 'internal',
	})
	const { $fontSize, $fontWeight, $lineHeight, $radius, $spacing } = useUiTheme()
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
	} = useBaseButton(props)

	const tokens = {
		...baseTokens,
		paddingX: (() => {
			// Subtract border from padding
			if (isVItem) return `calc(${$spacing['button-px-item']} - 1px)`
			if (props.size === 'xs') return `calc(${$spacing['button-px-xs']} - 1px)`
			if (props.size === 'sm') return `calc(${$spacing['button-px-sm']} - 1px)`
			if (props.size === 'md') return `calc(${$spacing['button-px-md']} - 1px)`
			if (props.size === 'lg') return `calc(${$spacing['button-px-lg']} - 1px)`
		})(),
		borderRadius: props.size === 'lg' ? $radius['md'] : $radius['sm'],
		fontWeight: isVItem && isVDefault ? $fontWeight['sm'] : $fontWeight['md'],
		fontSize: (() => {
			if (isVItem) return 'unset'
			if (props.size === 'xs') return $fontSize['xs']
			if (props.size === 'sm') return $fontSize['sm']
			if (props.size === 'md') return $fontSize['md']
			if (props.size === 'lg') return $fontSize['lg']
		})(),
	}

	const cssButton: CSS = {
		...cssBaseButton,
		minWidth: 'unset',
		padding: `0 ${tokens.paddingX}`,
		borderRadius: tokens.borderRadius,
		lineHeight: $lineHeight['sm'], // Needed for font descender
		fontSize: tokens.fontSize,
		fontWeight: tokens.fontWeight,

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
