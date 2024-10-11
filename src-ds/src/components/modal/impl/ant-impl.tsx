import { Button, useUiTheme } from '@ds/release'
import { Modal } from 'antd'
import { ModalProps } from '../_types'
import { useModalBase } from './_base'

export const AntImpl = (rawProps: ModalProps) => {
	const { props } = useModalBase(rawProps)
	const { $color, $spacing, $radius, $shadow, $zIndex } = useUiTheme()

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
			className={props.className}
			style={props.style}
			onCancel={props.onClose}
		>
			{props.children}
		</Modal>
	)
}
