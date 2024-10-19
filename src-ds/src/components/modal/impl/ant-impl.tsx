import { CloseSvg, useUiTheme } from '@ds/release'
import { Modal } from 'antd'
import { useEffect } from 'react'
import { ModalProps } from '../_types'
import { useModalBase } from './_base'
import './ant-impl.css'

export const AntImpl = (rawProps: ModalProps) => {
	const {
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
			backgroundColor: $color['bg-default'],
		},
		'& .ant-modal-title': {
			...cssModalTitle,
			color: $color['text-default'],
		},
		'& > [tabindex]': {
			...cssContent,
			outline: 'revert !important',
			borderRadius: $radius['lg'],
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
		'& .ant-modal-close': {
			...cssModalCloseX,
			width: $spacing['button-h-md'],
			height: $spacing['button-h-md'],
			borderRadius: $radius['full'],
			fill: 'currentColor',

			'&:hover, &:focus': {
				backgroundColor: $color['hover-default'],
				color: $color['text-subtle'],
			},
			'&:active': {
				backgroundColor: $color['hover-pressed'],
			},
			'&:focus-visible': {
				outline: 'revert',
				outlineOffset: 'unset',
			},
		},
	}

	useEffect(() => {
		setZIndex(props.opened ? openActiveIndex() : closeActiveIndex())
	}, [props.opened])

	return (
		<Modal
			open={props.opened}
			title={props.slotTitle}
			footer={slotFooter}
			keyboard={!props.noClose}
			closable={!props.noClose}
			maskClosable={!props.persistent}
			zIndex={calcZIndex as any}
			wrapClassName={cx(classWrapperPXY, props.persistent ? 'ds-modal-persistent' : 'ds-modal-default')}
			closeIcon={<CloseSvg className="h-xs-7" />}
			className={props.className}
			style={props.style}
			css={cssModal}
			afterOpenChange={(opened: boolean) => opened && props.onOpen?.()}
			onCancel={props.onClose}
		>
			{props.children}
		</Modal>
	)
}
