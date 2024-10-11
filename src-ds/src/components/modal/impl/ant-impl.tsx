import { Button, useUiTheme } from '@ds/release'
import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { ModalProps } from '../_types'
import { useModalBase } from './_base'

export const AntImpl = (rawProps: ModalProps) => {
	const { props, cssModalHeight, cssModalWidth, isActiveId, openActiveId, closeActiveId } = useModalBase(rawProps)
	const { $color, $spacing, $radius, $shadow, $zIndex } = useUiTheme()
	const [modalId, setModalId] = useState(0)

	const cssModal: CSS = {
		...cssModalWidth,
		...cssModalHeight,
		width: '100% !important',
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
		<div className="flex items-center justify-end gap-xs-3">
			{/* CLOSE */}
			{!props.noClose && (
				<Button variant="text-default" onClick={props.onClose}>
					Close
				</Button>
			)}
			{/* BUTTONS */}
			{props.slotButtons}
		</div>
	)

	return (
		<Modal
			open={props.opened}
			title={props.slotTitle}
			footer={slotFooter}
			maskClosable={false}
			zIndex={calcZIndex as any}
			className={props.className}
			style={props.style}
			css={cssModal}
			onCancel={props.onClose}
		>
			{props.children}
		</Modal>
	)
}
