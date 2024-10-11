import { useUiTheme } from '@ds/release'
import { useDefaults } from '@utils/release'
import { ModalProps } from '../_types'

let _activeModalId = 0

export const useModalBase = (rawProps: ModalProps) => {
	const props = useDefaults<ModalProps>(rawProps, {
		width: 'md',
		height: 'fit',
	})
	const { $color, $spacing, $radius, $shadow, $zIndex } = useUiTheme()

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

	const openActiveId = () => {
		_activeModalId++
		return _activeModalId
	}
	const closeActiveId = () => (_activeModalId = _activeModalId > 1 ? _activeModalId - 1 : 0)
	const isActiveId = (id: number) => id && id === _activeModalId

	return {
		cssModalHeight,
		cssModalWidth,
		props,
		closeActiveId,
		isActiveId,
		openActiveId,
	}
}
