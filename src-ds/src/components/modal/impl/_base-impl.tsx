import { Button, CloseSvg, IconButton, useUiTheme } from '@ds/release'
import { CSS__FIXED_OVERLAY, useDefaults } from '@utils/release'
import { useEffect, useState } from 'react'
import { ModalProps } from '../_types'

let _lastStackIndex = 0

export const ANIM_TIME = {
	SHOW: 300, // ms
	HIDE: 150, // ms
}

export const useBaseImpl = (rawProps: ModalProps) => {
	const props = useDefaults<ModalProps>(rawProps, {
		width: 'md',
		height: 'fit',
	})
	const { $blur, $color, $fontSize, $fontWeight, $spacing, $radius, $shadow, $zIndex } = useUiTheme()
	const [stackIndex, setStackIndex] = useState(0)

	const tokens = {
		modalOverlayBgColor: props.noDismiss ? $color['modal-overlay-strong'] : $color['modal-overlay-subtle'],
		modalOverlayBlur: props.noDismiss ? `blur(${$blur['default']})` : `blur(${$blur['subtle']})`,
		modalMargin: $spacing['xs-9'],
		modalContentPX: $spacing['sm-0'],
		modalContentPY: $spacing['xs-8'],
		modalZIndex: `calc(${$zIndex['modal']} + ${stackIndex})`,
		modalWidth: (() => {
			if (props.width === 'xs') return $spacing['modal-xs']
			if (props.width === 'sm') return $spacing['modal-sm']
			if (props.width === 'md') return $spacing['modal-md']
			if (props.width === 'lg') return $spacing['modal-lg']
			if (props.width === 'xl') return $spacing['modal-xl']
			if (props.width === 'full') return '100%'
			return ''
		})(),
		modalHeight: (() => {
			if (props.height === 'fit') return 'fit-content'
			if (props.height === 'full') return '100%'
			return ''
		})(),
	}

	const cssModalOverlay: CSS = {
		...CSS__FIXED_OVERLAY,
		zIndex: -1,
		backgroundColor: tokens.modalOverlayBgColor,
		backdropFilter: tokens.modalOverlayBlur,
	}
	const cssModalCard: CSS = {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		minHeight: 0,
		width: '100%',
		maxWidth: tokens.modalWidth,
		height: tokens.modalHeight,
		maxHeight: '100%',
		margin: `0 auto`,
		border: `1px solid ${$color['border-shadow']}`,
		borderRadius: $radius['lg'],
		backgroundColor: $color['bg-page'],
		boxShadow: $shadow['lg'],
	}
	const cssModalContent: CSS = {
		display: 'flex',
		flexDirection: 'column',
		gap: $spacing['sm-0'],
		minHeight: 0,
		height: tokens.modalHeight,
		maxHeight: '100%',
		padding: `${tokens.modalContentPY} ${tokens.modalContentPX}`,
		backgroundColor: $color['bg-page'],
		color: $color['text-default'],
	}
	const cssModalTitle: CSS = {
		display: 'flex',
		alignItems: 'center',
		minHeight: $spacing['button-h-md'],
		marginRight: $spacing['button-h-md'],
		fontSize: $fontSize['lg'],
		fontWeight: $fontWeight['lg'],
	}
	const cssModalBody: CSS = {
		flex: '1 1 0%',
		margin: `0 calc(-1 * ${tokens.modalContentPX})`,
		padding: `${$spacing['a11y-padding']} 0`,
		paddingLeft: tokens.modalContentPX,
		paddingRight: `calc(${tokens.modalContentPX} - ${$spacing['scrollbar-w']})`,
		overflowY: 'scroll',
	}
	const cssModalFooter: CSS = {
		display: props.noFooter ? 'none' : 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
		marginTop: $spacing['xs-5'],
	}
	const cssModalActions: CSS = {
		display: 'flex',
		alignItems: 'center',
		gap: $spacing['xs-9'],
		marginLeft: 'auto',
	}

	const isLastStackIndex = (index: number) => Boolean(index && index === _lastStackIndex)

	const computeStackIndex = () => {
		if (props.opened) {
			_lastStackIndex++
			setStackIndex(_lastStackIndex)
		} else {
			if (stackIndex === 0) return

			_lastStackIndex = _lastStackIndex > 1 ? _lastStackIndex - 1 : 0
			// Delay stack index to keep the modal above
			wait(ANIM_TIME.HIDE).then(() => setStackIndex(0))
		}
	}

	useEffect(() => {
		computeStackIndex()
	}, [props.opened])

	const slotCloseX = !props.noClose && (
		<IconButton
			tooltip={t('core.action.close')}
			variant="text-subtle"
			className="!absolute"
			css={{ top: tokens.modalContentPY, right: tokens.modalContentPY }}
			onClick={props.onClose}
		>
			<CloseSvg className="h-xs-7" />
		</IconButton>
	)

	const slotFooter = (
		<>
			{props.extras}

			<div css={cssModalActions}>
				{!props.noClose && (
					<Button variant="text-default" onClick={props.onClose}>
						{t('core.action.close')}
					</Button>
				)}
				{props.actions}
			</div>
		</>
	)

	const slotContent = (
		<>
			{/* TITLE */}
			<div css={cssModalTitle}>{props.title}</div>
			{/* CLOSE-X */}
			{slotCloseX}
			{/* BODY */}
			<div css={cssModalBody}>{props.children}</div>
			{/* FOOTER */}
			<div css={cssModalFooter}>{slotFooter}</div>
		</>
	)

	return {
		cssModalBody,
		cssModalCard,
		cssModalContent,
		cssModalFooter,
		cssModalOverlay,
		cssModalTitle,
		props,
		slotCloseX,
		slotContent,
		slotFooter,
		stackIndex,
		tokens,
		isLastStackIndex,
	}
}
