import { CSS__FIXED_OVERLAY, Keyboard, queryElementsWithTabIndex } from '@utils/release'
import { useEffect, useRef, useState } from 'react'
import { ModalProps } from '../_types'
import { ANIM_TIME, useBaseImpl } from './_base-impl'

export const CustomImpl = (rawProps: ModalProps) => {
	const {
		cssModalCard,
		cssModalContent,
		cssModalOverlay,
		props,
		slotContent,
		stackIndex,
		tokens,
		isLastStackIndex,
	} = useBaseImpl(rawProps)
	const [isVisible, setIsVisible] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLElement | null>(null)
	const focusTrap1Ref = useRef<HTMLDivElement>(null)
	const focusTrap2Ref = useRef<HTMLDivElement>(null)

	const cssRoot: CSS = {
		...CSS__FIXED_OVERLAY,
		visibility: isVisible ? 'visible' : 'hidden',
		padding: tokens.modalMargin,
		zIndex: tokens.modalZIndex,
		transition: isVisible ? 'none' : `visibility ${ANIM_TIME.HIDE}ms ease-in`,
	}
	const cssOverlay: CSS = {
		...cssModalOverlay,
		opacity: isVisible ? 1 : 0,
		transition: isVisible ? `opacity ${ANIM_TIME.SHOW}ms ease-out` : `opacity ${ANIM_TIME.HIDE}ms ease-in`,
	}
	const cssModal: CSS = {
		...cssModalCard,
		...cssModalContent,
		transform: isVisible ? 'translateY(0)' : `translateY(calc(-2 * ${tokens.modalMargin}))`,
		transition: `transform ${ANIM_TIME.SHOW}ms ease-out`,
	}

	const onOpenModal = () => {
		if (isVisible) return

		setIsVisible(true)
		wait(ANIM_TIME.SHOW).then(props.onOpened)

		wait(10).then(() => modalRef.current?.focus()) // Wait for html to be visible

		triggerRef.current = document.activeElement as HTMLElement | null
	}

	const onCloseModal = () => {
		if (!isVisible) return

		setIsVisible(false)
		wait(ANIM_TIME.HIDE).then(props.onClosed)

		triggerRef.current?.focus()
	}

	const onKeyDownWindow = (event: KeyboardEvent) => {
		if (!isVisible || !isLastStackIndex(stackIndex)) return
		if (event.key !== Keyboard.ESCAPE) return
		if (props.noDismiss) return

		event.stopPropagation()
		props.onClose?.()
	}

	const onFocusInWindow = (event: FocusEvent) => {
		const target = event.target as HTMLElement

		if (!isVisible || !isLastStackIndex(stackIndex)) return
		if (!target || !modalRef.current) return
		if (modalRef.current.contains(target)) return

		const targets = queryElementsWithTabIndex(modalRef.current)
		const firstTarget = targets[0]
		const lastTarget = targets[targets.length - 1]

		if (target === focusTrap1Ref.current) lastTarget.focus()
		if (target === focusTrap2Ref.current) firstTarget.focus()
	}

	useEffect(() => {
		props.opened ? onOpenModal() : onCloseModal()
	}, [props.opened])

	useEffect(() => {
		if (isVisible) {
			window.addEventListener('focusin', onFocusInWindow)
			window.addEventListener('keydown', onKeyDownWindow)
		}
		return () => {
			window.removeEventListener('focusin', onFocusInWindow)
			window.removeEventListener('keydown', onKeyDownWindow)
		}
	}, [isVisible, props.noDismiss, props.noClose])

	return (
		<div css={cssRoot}>
			{/* OVERLAY */}
			<div css={cssOverlay} onClick={() => !props.noDismiss && props.onClose?.()} />

			{/* FOCUS TRAP */}
			<div ref={focusTrap1Ref} tabIndex={0} />

			{/* MODAL */}
			<section ref={modalRef} role="dialog" tabIndex={-1} css={cssModal}>
				{slotContent}
			</section>

			{/* FOCUS TRAP */}
			<div ref={focusTrap2Ref} tabIndex={0} />
		</div>
	)
}
