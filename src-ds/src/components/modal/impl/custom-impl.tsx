import { Button, CloseSvg, IconButton, useUiTheme } from '@ds/release'
import { Keyboard, queryElementsWithTabIndex } from '@utils/release'
import { useEffect, useRef, useState } from 'react'
import { ModalProps } from '../_types'
import { useModalBase } from './_base'

export const CustomImpl = (rawProps: ModalProps) => {
	const {
		calcMargin,
		calcZIndex,
		cssModalBase,
		cssModalBody,
		cssModalCloseX,
		cssModalContent,
		cssModalFooter,
		cssModalTitle,
		props,
		closeActiveIndex,
		isActiveIndex,
		openActiveIndex,
		setZIndex,
	} = useModalBase(rawProps)
	const { $color } = useUiTheme()
	const [modalIndex, setModalIndex] = useState(0)
	const modalRef = useRef<HTMLDivElement | null>(null)
	const triggerRef = useRef<HTMLElement | null>(null)
	const focusTrap1Ref = useRef<HTMLDivElement | null>(null)
	const focusTrap2Ref = useRef<HTMLDivElement | null>(null)

	const ANIM_TIME__SHOW = 300
	const ANIM_TIME__HIDE = 150

	const cssWrapper: CSS = {
		visibility: modalIndex ? 'visible' : 'hidden',
		position: 'fixed',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',
		height: '100%',
		padding: calcMargin,
		zIndex: calcZIndex,
		transition: modalIndex ? 'none' : `visibility ${ANIM_TIME__HIDE}ms ease-in`,

		'&::before': {
			content: `''`,
			position: 'fixed',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			zIndex: -1,
			backgroundColor: $color['black-glass-5'],
			backdropFilter: 'blur(4px)',
			opacity: modalIndex ? 1 : 0,
			transition: modalIndex ? `opacity ${ANIM_TIME__SHOW}ms ease-out` : `opacity ${ANIM_TIME__HIDE}ms ease-in`,
		},
	}

	const cssModal: CSS = {
		...cssModalBase,
		...cssModalContent,
		transform: modalIndex ? 'translateY(0)' : `translateY(calc(-3 * ${calcMargin}))`,
		transition: `transform ${ANIM_TIME__SHOW}ms ease-out`,
	}

	const openModal = () => {
		if (modalIndex) return

		const index = openActiveIndex()
		setModalIndex(index)
		setZIndex(index)

		triggerRef.current = document.activeElement as HTMLElement | null
	}

	const closeModal = () => {
		if (!modalIndex) return

		closeActiveIndex()
		setModalIndex(0)
		wait(ANIM_TIME__HIDE).then(() => setZIndex(0))

		triggerRef.current?.focus()
	}

	const onKeyDownWindow = (event: KeyboardEvent) => {
		if (!isActiveIndex(modalIndex)) return
		if (event.key !== Keyboard.ESCAPE) return
		if (props.noClose) return

		event.stopPropagation()
		props.onClose?.()
	}

	const onFocusInWindow = (event: FocusEvent) => {
		const target = event.target as HTMLElement

		if (!isActiveIndex(modalIndex)) return
		if (!target || !modalRef.current) return
		if (modalRef.current.contains(target)) return

		const targets = queryElementsWithTabIndex(modalRef.current)
		const firstTarget = targets[0]
		const lastTarget = targets[targets.length - 1]

		if (target === focusTrap1Ref.current) lastTarget.focus()
		if (target === focusTrap2Ref.current) firstTarget.focus()
	}

	useEffect(() => {
		props.opened ? openModal() : closeModal()
	}, [props.opened])

	useEffect(() => {
		modalIndex && modalRef.current?.focus()
	}, [modalIndex])

	useEffect(() => {
		if (modalIndex) {
			window.addEventListener('focusin', onFocusInWindow)
			window.addEventListener('keydown', onKeyDownWindow)
		}
		return () => {
			window.removeEventListener('focusin', onFocusInWindow)
			window.removeEventListener('keydown', onKeyDownWindow)
		}
	}, [modalIndex, props.noClose])

	return (
		<div css={cssWrapper}>
			{/* FOCUS TRAP */}
			<div ref={focusTrap1Ref} tabIndex={0} />

			{/* MODAL */}
			<div ref={modalRef} tabIndex={-1} className={props.className} style={props.style} css={[cssModal]}>
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

			{/* FOCUS TRAP */}
			<div ref={focusTrap2Ref} tabIndex={0} />
		</div>
	)
}
