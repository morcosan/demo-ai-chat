import Modal from '@mui/material/Modal'
import { ModalProps } from '../_types'
import { ANIM_TIME, useBaseImpl } from './_base-impl'

type MuiCloseReason = 'backdropClick' | 'escapeKeyDown'

export const MaterialImpl = (rawProps: ModalProps) => {
	const { cssModalCard, cssModalContent, cssModalOverlay, props, slotContent, stackIndex, tokens } =
		useBaseImpl(rawProps)

	const cssRoot: CSS = {
		padding: tokens.modalMargin,
		zIndex: tokens.modalZIndex,
		'& .MuiModal-backdrop': cssModalOverlay,
	}
	const cssModal: CSS = {
		...cssModalCard,
		...cssModalContent,
		transform: stackIndex ? 'translateY(0)' : `translateY(calc(-2 * ${tokens.modalMargin}))`,
		transition: `transform ${ANIM_TIME.SHOW}ms ease-out`,
	}

	const onClose = (_: object, reason: MuiCloseReason) => {
		if (reason === 'escapeKeyDown') props.onClose?.()
		if (reason === 'backdropClick') !props.noDismiss && props.onClose?.()

		// Material doesn't have onClosed event
		wait(ANIM_TIME.HIDE).then(() => props.onClosed?.())
	}

	return (
		<Modal
			open={props.opened}
			disableEscapeKeyDown={props.noDismiss}
			css={cssRoot}
			slotProps={{ backdrop: { onEntered: props.onOpened } }}
			keepMounted
			onClose={onClose}
		>
			{/* MODAL */}
			<section tabIndex={-1} css={cssModal}>
				{slotContent}
			</section>
		</Modal>
	)
}
