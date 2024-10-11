import { useUiTheme } from '@ds/release'
import { useDefaults } from '@utils/release'
import { ModalProps } from '../_types'

let _activeModalId = 0

export const useModalBase = (rawProps: ModalProps) => {
	const props = useDefaults<ModalProps>(rawProps, {
		width: 'md',
		height: 'fit',
	})
	const { $color, $fontSize, $fontWeight, $spacing, $radius, $shadow } = useUiTheme()

	const calcMargin = $spacing['xs-9']
	const calcContentPX = $spacing['sm-0']
	const calcContentPY = $spacing['xs-8']

	const cssModalWidth: CSS = (() => {
		if (props.width === 'xs') return { maxWidth: $spacing['modal-xs'], width: '100%' }
		if (props.width === 'sm') return { maxWidth: $spacing['modal-sm'], width: '100%' }
		if (props.width === 'md') return { maxWidth: $spacing['modal-md'], width: '100%' }
		if (props.width === 'lg') return { maxWidth: $spacing['modal-lg'], width: '100%' }
		if (props.width === 'xl') return { maxWidth: $spacing['modal-xl'], width: '100%' }
		if (props.width === 'full') return { maxWidth: '100%', width: '100%' }
		return {}
	})()

	const cssModalHeight: CSS = (() => {
		if (props.height === 'fit') return { height: 'fit-content', maxHeight: '100%' }
		if (props.height === 'full') return { height: '100%', maxHeight: '100%' }
		return {}
	})()

	const cssModalBase: CSS = {
		...cssModalWidth,
		...cssModalHeight,
		margin: `0 auto`,
		border: `1px solid ${$color['border-shadow']}`,
		borderRadius: $radius['lg'],
		boxShadow: $shadow['lg'],
		backgroundColor: $color['bg-default'],
	}

	const cssModalContent: CSS = {
		display: 'flex',
		flexDirection: 'column',
		gap: $spacing['sm-0'],
		padding: `${calcContentPY} ${calcContentPX}`,
	}

	const cssModalTitle: CSS = {
		display: 'flex',
		alignItems: 'center',
		minHeight: $spacing['button-h-md'],
		fontSize: $fontSize['lg'],
		fontWeight: $fontWeight['lg'],
	}

	const cssModalBody: CSS = {
		flex: '1 1 0%',
		margin: `0 calc(-1 * ${calcContentPX})`,
		padding: `${$spacing['a11y-padding']} 0`,
		paddingLeft: calcContentPX,
		paddingRight: `calc(${calcContentPX} - ${$spacing['scrollbar-w']})`,
		overflowY: 'scroll',
	}

	const cssModalFooter: CSS = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: $spacing['xs-3'],
	}

	const cssModalCloseX: CSS = {
		position: 'absolute',
		top: calcContentPY,
		right: calcContentPY,
		fill: $color['text-subtle'],
	}

	const openActiveId = () => {
		_activeModalId++
		return _activeModalId
	}
	const closeActiveId = () => (_activeModalId = _activeModalId > 1 ? _activeModalId - 1 : 0)
	const isActiveId = (id: number) => id && id === _activeModalId

	return {
		calcMargin,
		cssModalBase,
		cssModalBody,
		cssModalCloseX,
		cssModalContent,
		cssModalFooter,
		cssModalTitle,
		props,
		closeActiveId,
		isActiveId,
		openActiveId,
	}
}
