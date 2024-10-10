import { Button, CloseSvg, IconButton, useUiTheme } from '@ds/release'
import { Keyboard, queryElementsWithTabIndex, useDefaults } from '@utils/release'
import { Ref, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { ModalProps, ModalRef } from '../_types'

export const CustomImpl = (rawProps: ModalProps, ref: Ref<ModalRef>) => {
	const props = useDefaults<ModalProps>(rawProps, {
		width: 'md',
		height: 'fit',
	})
	const { $color, $spacing, $radius, $shadow, $zIndex } = useUiTheme()
	const [opened, setOpened] = useState(false)
	const modalRef = useRef<HTMLDivElement | null>(null)
	const triggerRef = useRef<HTMLElement | null>(null)
	const focusTrap1Ref = useRef<HTMLDivElement | null>(null)
	const focusTrap2Ref = useRef<HTMLDivElement | null>(null)

	useImperativeHandle(ref, () => ({
		open: openModal,
		close: closeModal,
	}))

	const cssWrapper: CSS = {
		display: opened ? 'block' : 'none',
		position: 'fixed',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',
		height: '100%',
		padding: $spacing['sm-0'],
		zIndex: $zIndex['modal'],

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
		},
	}

	const calcPaddingX = $spacing['sm-0']
	const calcPaddingY = $spacing['xs-8']

	const cssModal: CSS = {
		display: 'flex',
		flexDirection: 'column',
		gap: $spacing['sm-0'],
		width: '100%',
		maxHeight: '100%',
		margin: `0 auto`,
		padding: `${calcPaddingY} ${calcPaddingX}`,
		border: `1px solid ${$color['border-shadow']}`,
		borderRadius: $radius['lg'],
		backgroundColor: $color['bg-default'],
		boxShadow: $shadow['lg'],
	}

	const cssModalWidth: CSS = (() => {
		if (props.width === 'xs') return { maxWidth: $spacing['modal-xs'] }
		if (props.width === 'sm') return { maxWidth: $spacing['modal-sm'] }
		if (props.width === 'md') return { maxWidth: $spacing['modal-md'] }
		if (props.width === 'lg') return { maxWidth: $spacing['modal-lg'] }
		if (props.width === 'xl') return { maxWidth: $spacing['modal-xl'] }
		if (props.width === 'full') return { maxWidth: '100%' }
		return {}
	})()

	const cssModalHeight: CSS = (() => {
		if (props.height === 'fit') return { height: 'fit-content' }
		if (props.height === 'full') return { height: '100%' }
		return {}
	})()

	const cssModalBody: CSS = {
		flex: '1 1 0%',
		margin: `0 calc(-1 * ${calcPaddingX})`,
		padding: `0 calc(${calcPaddingX} - ${$spacing['scrollbar-w']}) 0 ${calcPaddingX}`,
		overflowY: 'scroll',
	}

	const cssCloseX: CSS = {
		marginRight: `calc(${calcPaddingY} - ${calcPaddingX})`,
	}

	const openModal = () => {
		setOpened(true)
		triggerRef.current = document.activeElement as HTMLElement | null
	}

	const closeModal = () => {
		setOpened(false)
		triggerRef.current?.focus()
	}

	const onKeyDownWindow = (event: KeyboardEvent) => {
		event.key == Keyboard.ESCAPE && closeModal()
	}

	const onFocusInWindow = (event: FocusEvent) => {
		const target = event.target as HTMLElement

		if (!target || !modalRef.current) return
		if (modalRef.current.contains(target)) return

		const targets = queryElementsWithTabIndex(modalRef.current)
		const firstTarget = targets[0]
		const lastTarget = targets[targets.length - 1]

		if (target === focusTrap1Ref.current) lastTarget.focus()
		if (target === focusTrap2Ref.current) firstTarget.focus()
	}

	useEffect(() => {
		if (opened) {
			modalRef.current?.focus()
			window.addEventListener('focusin', onFocusInWindow)
		}

		return () => {
			window.removeEventListener('focusin', onFocusInWindow)
		}
	}, [opened])

	useEffect(() => {
		window.addEventListener('keydown', onKeyDownWindow)

		return () => {
			window.removeEventListener('keydown', onKeyDownWindow)
		}
	}, [])

	return (
		<div css={cssWrapper}>
			{/* FOCUS TRAP */}
			<div ref={focusTrap1Ref} tabIndex={0} />

			{/* CONTENT */}
			<div ref={modalRef} css={[cssModal, cssModalWidth, cssModalHeight]} tabIndex={-1}>
				{/* HEADER */}
				<div className="flex items-center justify-between">
					<div className="text-size-lg font-weight-lg">{props.slotTitle}</div>

					{/* CLOSE-X */}
					{!props.noClose && (
						<IconButton tooltip="Close" variant="text-default" css={cssCloseX} onClick={closeModal}>
							<CloseSvg className="h-xs-7" />
						</IconButton>
					)}
				</div>

				{/* BODY */}
				<div css={cssModalBody}>{props.children}</div>

				{/* FOOTER */}
				<div className="flex items-center justify-end gap-xs-3">
					{/* CLOSE */}
					{!props.noClose && (
						<Button variant="text-default" onClick={closeModal}>
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
