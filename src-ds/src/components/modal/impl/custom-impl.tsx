import { Button, CloseSvg, IconButton, useUiTheme } from '@ds/release'
import { Ref, useImperativeHandle, useState } from 'react'
import { ModalProps, ModalRef } from '../_types'

export const CustomImpl = (props: ModalProps, ref: Ref<ModalRef>) => {
	const { $color, $spacing, $radius, $zIndex } = useUiTheme()
	const [opened, setOpened] = useState(false)

	useImperativeHandle(ref, () => ({
		open: () => setOpened(true),
		close: () => setOpened(false),
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

	const calcPaddingX = $spacing['xs-9']
	const calcPaddingY = $spacing['xs-7']

	const cssContent: CSS = {
		display: 'flex',
		flexDirection: 'column',
		gap: $spacing['xs-9'],
		width: '100%',
		maxHeight: '100%',
		margin: `0 auto`,
		padding: `${calcPaddingY} ${calcPaddingX}`,
		border: `1px solid ${$color['border-shadow']}`,
		borderRadius: $radius['lg'],
		backgroundColor: $color['bg-default'],
	}

	const cssContentWidth: CSS = (() => {
		if (props.width === 'xs') return { maxWidth: $spacing['modal-xs'] }
		if (props.width === 'sm') return { maxWidth: $spacing['modal-sm'] }
		if (props.width === 'md') return { maxWidth: $spacing['modal-md'] }
		if (props.width === 'lg') return { maxWidth: $spacing['modal-lg'] }
		if (props.width === 'xl') return { maxWidth: $spacing['modal-xl'] }
		if (props.width === 'full') return { maxWidth: '100%' }
		return {}
	})()

	const cssContentHeight: CSS = (() => {
		if (props.height === 'fit') return { height: 'fit-content' }
		if (props.height === 'full') return { height: '100%' }
		return {}
	})()

	const cssContentBody: CSS = {
		flex: '1 1 0%',
		margin: `0 calc(-1 * ${calcPaddingX})`,
		padding: `0 calc(${calcPaddingX} - ${$spacing['scrollbar-w']}) 0 ${calcPaddingX}`,
		overflowY: 'scroll',
	}

	return (
		<div css={cssWrapper}>
			<div css={[cssContent, cssContentWidth, cssContentHeight]}>
				{/* HEADER */}
				<div className="flex items-center justify-between">
					<div className="text-size-lg font-weight-lg">{props.slotTitle}</div>

					{/* CLOSE-X */}
					<IconButton tooltip="Close" variant="text-default" className="-mr-xs-2" onClick={() => setOpened(false)}>
						<CloseSvg className="h-xs-7" />
					</IconButton>
				</div>

				{/* BODY */}
				<div css={cssContentBody}>{props.children}</div>

				{/* FOOTER */}
				<div className="flex items-center justify-end gap-xs-3">
					{/* CLOSE */}
					<Button variant="text-default" size="md" onClick={() => setOpened(false)}>
						Close
					</Button>
					{/* BUTTONS */}
					{props.slotButtons}
				</div>
			</div>
		</div>
	)
}
