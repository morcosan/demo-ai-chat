import { Button, CloseSvg, IconButton, useUiTheme } from '@ds/release'
import Modal from '@mui/material/Modal'
import { useEffect } from 'react'
import { ModalProps } from '../_types'
import { useModalBase } from './_base'

export const MuiImpl = (rawProps: ModalProps) => {
	const {
		calcZIndex,
		calcWrapperPXY,
		cssModalBase,
		cssModalBody,
		cssModalCloseX,
		cssModalContent,
		cssModalFooter,
		cssModalTitle,
		props,
		closeActiveIndex,
		openActiveIndex,
		setZIndex,
	} = useModalBase(rawProps)
	const { $color, $fontSize, $lineHeight, $radius, $spacing } = useUiTheme()

	const cssWrapper: CSS = {
		padding: calcWrapperPXY,
	}

	const cssModal: CSS = {
		...cssModalBase,
		...cssModalContent,
	}

	const onClose = (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
		if (reason === 'backdropClick') return

		props.onClose?.()
	}

	useEffect(() => {
		setZIndex(props.opened ? openActiveIndex() : closeActiveIndex())
	}, [props.opened])

	return (
		<Modal open={props.opened} className={props.className} style={props.style} sx={cssWrapper} onClose={onClose}>
			<div tabIndex={-1} className={props.className} style={props.style} css={[cssModal]}>
				{/* TITLE */}
				<div css={cssModalTitle}>{props.slotTitle}</div>

				{/* CLOSE-X */}
				{!props.noClose && (
					<IconButton tooltip="Close" variant="text-default" css={cssModalCloseX} onClick={props.onClose}>
						<CloseSvg className="h-xs-7" />
					</IconButton>
				)}

				{/* BODY */}
				<div css={cssModalBody}>{props.children}</div>

				{/* FOOTER */}
				<div css={cssModalFooter}>
					{/* CLOSE */}
					{!props.noClose && (
						<Button variant="text-default" onClick={props.onClose}>
							Close
						</Button>
					)}
					{/* BUTTONS */}
					{props.slotButtons}
				</div>
			</div>
		</Modal>
	)
}
