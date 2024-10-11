import { Button, CloseSvg, useUiTheme } from '@ds/release'
import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { ModalProps } from '../_types'
import { useModalBase } from './_base'

export const AntImpl = (rawProps: ModalProps) => {
	const {
		cssModalBase,
		cssModalBody,
		cssModalCloseX,
		cssModalContent,
		cssModalFooter,
		cssModalTitle,
		props,
		openActiveId,
		closeActiveId,
	} = useModalBase(rawProps)
	const { $color, $fontSize, $lineHeight, $radius, $spacing, $zIndex } = useUiTheme()
	const [modalId, setModalId] = useState(0)

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
		'& .ant-modal-content': {
			...cssModalContent,
		},
		'& .ant-modal-body': {
			...cssModalBody,
		},
		'& .ant-modal-footer': {
			...cssModalFooter,
			margin: 0,
		},
	}

	const calcZIndex = `calc(${$zIndex['modal']} + ${modalId})`

	useEffect(() => {
		if (props.opened) {
			setModalId(openActiveId())
		} else {
			closeActiveId()
			setModalId(0)
		}
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
