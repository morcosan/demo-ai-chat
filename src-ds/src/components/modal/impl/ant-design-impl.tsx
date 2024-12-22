import { useUiTheme } from '@ds/release'
import { CSS__FIXED_OVERLAY } from '@utils/release'
import { Modal } from 'antd'
import { useEffect, useRef } from 'react'
import { ModalProps } from '../_types'
import { useBaseImpl } from './_base-impl'

export const AntDesignImpl = (rawProps: ModalProps) => {
	const {
		cssModalBody,
		cssModalCard,
		cssModalContent,
		cssModalFooter,
		cssModalTitle,
		props,
		slotCloseX,
		slotFooter,
		tokens,
	} = useBaseImpl(rawProps)
	const { $color, $fontSize, $lineHeight, $radius } = useUiTheme()
	const hiddenRef = useRef<HTMLElement>(null)

	const cssContent: CSS = {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		overflow: 'hidden',
	}
	const cssRoot: CSS = {
		'.ant-modal-mask': {
			zIndex: tokens.modalZIndex,
			backgroundColor: 'transparent',
		},
		'.ant-modal-wrap': {
			zIndex: tokens.modalZIndex,
			padding: tokens.modalMargin,

			'&::before': {
				...CSS__FIXED_OVERLAY,
				content: "''",
				zIndex: -1,
				backdropFilter: tokens.modalOverlayBlur,
				backgroundColor: tokens.modalOverlayBgColor,
			},
		},
	}
	const cssModal: CSS = {
		...cssModalCard,
		top: 0,
		width: '100% !important',
		padding: 0,

		'& [class^="ant-modal"]': {
			fontSize: $fontSize['md'],
			lineHeight: $lineHeight['md'],
		},
		'& .ant-modal-header': {
			margin: 0,
			backgroundColor: $color['bg-page'],
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
		'& .ant-modal-body': cssModalBody,
		'& .ant-modal-footer': cssModalFooter,
	}

	useEffect(() => {
		if (!hiddenRef.current) return

		// Ant doesn't allow class directly on wrapper
		const className = hiddenRef.current.getAttribute('class')
		const rootElem = hiddenRef.current.closest('.ant-modal-root')

		if (className && rootElem) {
			const prefix = className.split('-')[0]
			rootElem.classList.forEach((cls) => cls.startsWith(prefix) && rootElem.classList.remove(cls))
			rootElem.classList.add(className)
		}
	}, [tokens])

	return (
		<Modal
			open={props.opened}
			title={props.title}
			footer={slotFooter}
			keyboard={!props.noDismiss}
			closable={false}
			maskClosable={!props.noDismiss}
			afterOpenChange={(opened: boolean) => (opened ? props.onOpened?.() : props.onClosed?.())}
			css={cssModal}
			forceRender
			onCancel={props.onClose}
		>
			<i ref={hiddenRef} css={cssRoot} style={{ display: 'none' }} />
			{slotCloseX}
			{props.children}
		</Modal>
	)
}
