import { CloseSvg, IconButton, useUiTheme } from '@ds/release'
import Modal from '@mui/material/Modal'
import { useEffect } from 'react'
import { ModalProps } from '../_types'
import { useModalBase } from './_base'

type MuiCloseReason = 'backdropClick' | 'escapeKeyDown'

export const MuiImpl = (rawProps: ModalProps) => {
	const {
		ANIM_TIME__SHOW,
		calcZIndex,
		calcWrapperPXY,
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
		openActiveIndex,
		setZIndex,
	} = useModalBase(rawProps)
	const { $color } = useUiTheme()

	const cssWrapper: CSS = {
		padding: calcWrapperPXY,
		zIndex: calcZIndex,

		'& .MuiModal-backdrop': {
			backgroundColor: $color['black-glass-5'],
			backdropFilter: 'blur(4px)',
		},
	}

	const cssModal: CSS = {
		...cssModalBase,
		...cssModalContent,
		transform: zIndex ? 'translateY(0)' : `translateY(calc(-3 * ${calcWrapperPXY}))`,
		transition: `transform ${ANIM_TIME__SHOW}ms ease-out`,
	}

	const onClose = (_: object, reason: MuiCloseReason) => reason === 'escapeKeyDown' && props.onClose?.()

	useEffect(() => {
		setZIndex(props.opened ? openActiveIndex() : closeActiveIndex())
	}, [props.opened])

	return (
		<Modal
			open={props.opened}
			disableEscapeKeyDown={props.noClose}
			className={props.className}
			style={props.style}
			sx={cssWrapper}
			onClose={onClose}
		>
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
				<div css={cssModalFooter}>{slotFooter}</div>
			</div>
		</Modal>
	)
}