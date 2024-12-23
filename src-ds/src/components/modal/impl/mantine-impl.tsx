import { Modal, TransitionOverride } from '@mantine/core'
import '@mantine/core/styles/Modal.css'
import '@mantine/core/styles/ModalBase.css'
import { CSS__FIXED_OVERLAY } from '@utils/release'
import { useEffect, useRef } from 'react'
import { ModalProps } from '../_types'
import { ANIM_TIME, useBaseImpl } from './_base-impl'

export const MantineImpl = (rawProps: ModalProps) => {
	const {
		cssModalCard,
		cssModalContent,
		cssModalOverlay,
		cssModalTitle,
		props,
		slotContent,
		stackIndex,
		tokens,
		isLastStackIndex,
	} = useBaseImpl(rawProps)
	const rootRef = useRef<HTMLDivElement>(null)

	const transitionProps: TransitionOverride = {
		duration: ANIM_TIME.SHOW,
		exitDuration: ANIM_TIME.HIDE,
		transition: 'fade-down',
	}
	const cssRoot: CSS = {
		...CSS__FIXED_OVERLAY,
		display: props.opened ? 'block' : 'none',
		zIndex: tokens.modalZIndex,

		'.mantine-Modal-overlay': cssModalOverlay,
		'.mantine-Modal-inner': {
			padding: tokens.modalMargin,
			height: '100%',
		},
		'.mantine-Modal-content': {
			...cssModalCard,
			maxWidth: '100%',
		},
		'.mantine-Modal-header': cssModalTitle,
		'.mantine-Modal-body': cssModalContent,
	}

	useEffect(() => {
		if (props.opened) {
			// Wait for modal to be added to DOM
			wait(10).then(() => {
				const elem = rootRef.current?.querySelector('.mantine-Modal-content') as HTMLElement | null
				elem?.focus()
			})
		}
	}, [props.opened])

	return (
		<Modal
			ref={rootRef}
			opened={props.opened}
			size={cssModalCard.maxWidth as string}
			closeOnClickOutside={!props.noDismiss}
			closeOnEscape={!props.noDismiss}
			transitionProps={transitionProps}
			withCloseButton={false}
			lockScroll={false}
			css={cssRoot}
			keepMounted
			onClose={() => isLastStackIndex(stackIndex) && props.onClose?.()}
			onEnterTransitionEnd={() => props.onOpened?.()}
			onExitTransitionEnd={() => props.onClosed?.()}
		>
			{slotContent}
		</Modal>
	)
}
