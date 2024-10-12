import { CloseSvg, IconButton, useUiTheme } from '@ds/release'
import { CSS__FIXED_OVERLAY, Keyboard, queryElementsWithTabIndex } from '@utils/release'
import { useEffect, useRef, useState } from 'react'
import { ModalProps } from '../_types'
import { useModalBase } from './_base'

export const CustomImpl = (rawProps: ModalProps) => {
	const {
		ANIM_TIME__HIDE,
		ANIM_TIME__SHOW,
		calcWrapperPXY,
		calcZIndex,
		cssModalBase,
		cssModalBody,
		cssModalCloseX,
		cssModalContent,
		cssModalFooter,
		cssModalTitle,
		props,
		slotFooter,
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

	const cssWrapper: CSS = {
		...CSS__FIXED_OVERLAY,
		visibility: modalIndex ? 'visible' : 'hidden',
		padding: calcWrapperPXY,
		zIndex: calcZIndex,
		transition: modalIndex ? 'none' : `visibility ${ANIM_TIME__HIDE}ms ease-in`,

		'&::before': {
			...CSS__FIXED_OVERLAY,
			content: `''`,
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
		transform: modalIndex ? 'translateY(0)' : `translateY(calc(-3 * ${calcWrapperPXY}))`,
		transition: `transform ${ANIM_TIME__SHOW}ms ease-out`,
	}

	const openModal = () => {
		if (modalIndex) return

		const index = openActiveIndex()
		setModalIndex(index)
		setZIndex(index)
		wait(ANIM_TIME__SHOW).then(() => modalRef.current?.focus())

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
				<div css={cssModalFooter}>{slotFooter}</div>
			</div>

			{/* FOCUS TRAP */}
			<div ref={focusTrap2Ref} tabIndex={0} />
		</div>
	)
}
