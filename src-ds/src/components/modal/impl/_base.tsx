import { Button, useUiTheme } from '@ds/release'
import { useDefaults } from '@utils/release'
import { useState } from 'react'
import { ModalProps } from '../_types'

let _activeIndex = 0

export const useModalBase = (rawProps: ModalProps) => {
	const props = useDefaults<ModalProps>(rawProps, {
		width: 'md',
		height: 'fit',
	})
	const { $color, $fontSize, $fontWeight, $spacing, $radius, $shadow, $zIndex } = useUiTheme()
	const [zIndex, setZIndex] = useState(0)

	const ANIM_TIME__SHOW = 300 // ms
	const ANIM_TIME__HIDE = 150 // ms

	const classWrapperPXY = 'p-xs-9'

	const calcWrapperPXY = $spacing['xs-9']
	const calcContentPX = $spacing['sm-0']
	const calcContentPY = $spacing['xs-8']
	const calcZIndex = `calc(${$zIndex['modal']} + ${zIndex})`

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
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		margin: `0 auto`,
		border: `1px solid ${$color['border-shadow']}`,
		borderRadius: $radius['lg'],
		boxShadow: $shadow['lg'],
	}

	const cssModalContent: CSS = {
		display: 'flex',
		flexDirection: 'column',
		gap: $spacing['sm-0'],
		padding: `${calcContentPY} ${calcContentPX}`,
		backgroundColor: $color['bg-default'],
		color: $color['text-default'],
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
		display: props.noFooter ? 'none' : 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: $spacing['xs-3'],
	}

	const cssModalCloseX: CSS = {
		position: 'absolute',
		top: calcContentPY,
		right: calcContentPY,
		color: $color['text-subtle'],
	}

	const openActiveIndex = () => {
		_activeIndex++
		return _activeIndex
	}
	const closeActiveIndex = () => {
		_activeIndex = _activeIndex > 1 ? _activeIndex - 1 : 0
		return 0
	}
	const isActiveIndex = (index: number) => index && index === _activeIndex

	const slotFooter = (
		<>
			{!props.noClose && (
				<Button variant="text-default" onClick={props.onClose}>
					Close
				</Button>
			)}
			{props.slotButtons}
		</>
	)

	return {
		ANIM_TIME__HIDE,
		ANIM_TIME__SHOW,
		calcWrapperPXY,
		calcZIndex,
		classWrapperPXY,
		cssModalBase,
		cssModalBody,
		cssModalCloseX,
		cssModalContent,
		cssModalFooter,
		cssModalTitle,
		props,
		slotFooter,
		zIndex,
		closeActiveIndex,
		isActiveIndex,
		openActiveIndex,
		setZIndex,
	}
}
