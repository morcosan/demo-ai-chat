import { Button, CloseSvg, IconButton, useUiTheme } from '@ds/release'
import { Ref, useImperativeHandle, useState } from 'react'
import { ModalProps, ModalRef } from '../_types'

export const CustomImpl = (props: ModalProps, ref: Ref<ModalRef>) => {
	const { $color, $spacing, $radius, isUiLight } = useUiTheme()
	const [opened, setOpened] = useState(false)

	useImperativeHandle(ref, () => ({
		open: () => setOpened(true),
		close: () => setOpened(false),
	}))

	const baseClass = 'w-full px-xs-9 py-xs-7 bg-color-bg-default border border-color-border-soft rounded-lg'

	const cssWidth: CSS = (() => {
		if (props.width === 'xs') return { maxWidth: $spacing['modal-xs'] }
		if (props.width === 'sm') return { maxWidth: $spacing['modal-sm'] }
		if (props.width === 'md') return { maxWidth: $spacing['modal-md'] }
		if (props.width === 'lg') return { maxWidth: $spacing['modal-lg'] }
		if (props.width === 'xl') return { maxWidth: $spacing['modal-xl'] }
		if (props.width === 'full') return { maxWidth: '100%' }
		return {}
	})()

	return (
		<div className={cx(!opened && 'hidden', 'z-modal')}>
			<div className="fixed-overlay z-[-1] h-screen w-screen bg-color-black-glass-3" />

			<div className={cx(baseClass)} css={cssWidth}>
				<div className="mb-sm-2 flex items-center justify-between">
					<div className="text-size-lg font-weight-lg">{props.title}</div>

					<IconButton variant="text-default" size="sm" tooltip="Close" onClick={() => setOpened(false)}>
						<CloseSvg className="h-xs-5" />
					</IconButton>
				</div>

				<div className="">{props.children}</div>

				<div className="mt-sm-2 flex items-center justify-end gap-xs-3">
					<Button variant="text-default" size="md" onClick={() => setOpened(false)}>
						Close
					</Button>
					{props.buttons}
				</div>
			</div>
		</div>
	)
}
