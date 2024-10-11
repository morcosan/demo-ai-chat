import { Button, CloseSvg, useUiTheme } from '@ds/release'
import { Modal } from 'antd'
import { useEffect } from 'react'
import { ModalProps } from '../_types'
import { useModalBase } from './_base'

export const AntImpl = (rawProps: ModalProps) => {
	const {
		calcZIndex,
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

	const cssContent: CSS = {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		overflow: 'hidden',
	}

	const cssModal: CSS = {
		...cssModalBase,
		top: 0,
		width: '100% !important',
		padding: 0,

		'& [class^="ant-modal"]': {
			fontSize: $fontSize['md'],
			lineHeight: $lineHeight['md'],
		},
		'& .ant-modal-header': {
			margin: 0,
		},
		'& .ant-modal-close': {
			...cssModalCloseX,
			width: $spacing['button-h-md'],
			height: $spacing['button-h-md'],
			borderRadius: $radius['full'],
		},
		'& .ant-modal-title': {
			...cssModalTitle,
			color: $color['text-default'],
		},
		'& > [tabindex]': {
			...cssContent,
		},
		'& .ant-modal-content': {
			...cssModalContent,
			...cssContent,
			boxShadow: 'none',
		},
		'& .ant-modal-body': {
			...cssModalBody,
		},
		'& .ant-modal-footer': {
			...cssModalFooter,
			margin: 0,
		},
	}

	useEffect(() => {
		setZIndex(props.opened ? openActiveIndex() : closeActiveIndex())
	}, [props.opened])

	const slotFooter = (
		<>
			{/* CLOSE */}
			{!props.noClose && (
				<Button variant="text-default" onClick={props.onClose}>
					Close
				</Button>
			)}
			{/* BUTTONS */}
			{props.slotButtons}
		</>
	)

	return (
		<Modal
			open={props.opened}
			title={props.slotTitle}
			footer={slotFooter}
			maskClosable={false}
			zIndex={calcZIndex as any}
			wrapClassName="p-xs-9 backdrop-blur-sm"
			closeIcon={<CloseSvg className="h-xs-7" />}
			className={props.className}
			style={props.style}
			css={cssModal}
			onCancel={props.onClose}
		>
			{props.children}
		</Modal>
	)
}
