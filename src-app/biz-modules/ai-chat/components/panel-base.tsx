import { ReactNode, RefObject, UIEvent } from 'react'
import { PanelToolbar } from './panel-toolbar'

interface Props extends ReactProps {
	containerRef?: RefObject<HTMLDivElement>
	containerClass?: string
	slotToolbar?: ReactNode
	slotFooter?: ReactNode
	onScroll?(event: UIEvent): void
}

export const PanelBase = (props: Props) => {
	const { containerRef, containerClass, slotToolbar, slotFooter, children, onScroll } = props

	return (
		<div className="flex h-full flex-col">
			<div
				ref={containerRef}
				className={cx('ds-scrollable flex flex-1 flex-col', containerClass)}
				onScroll={onScroll}
			>
				{/* TOOLBAR */}
				<PanelToolbar>{slotToolbar}</PanelToolbar>

				{/* CONTENT */}
				{children}
			</div>

			{slotFooter}
		</div>
	)
}
