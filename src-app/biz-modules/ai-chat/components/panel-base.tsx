import { ReactNode, RefObject, UIEvent } from 'react'
import { PanelToolbar } from './panel-toolbar'

interface Props extends ReactProps {
	containerClass?: string
	containerRef?: RefObject<HTMLDivElement | null>
	isChatView?: boolean
	isPreview?: boolean
	noContent?: boolean
	slotFooter?: ReactNode
	slotToolbar?: ReactNode
	onScroll?(event: UIEvent): void
}

export const PanelBase = (props: Props) => {
	const {
		children,
		className,
		containerClass,
		containerRef,
		isChatView,
		isPreview,
		noContent,
		slotFooter,
		slotToolbar,
		onScroll,
	} = props

	return (
		<div className={cx('flex h-full flex-col', isPreview && 'bg-color-bg-card', className)}>
			<div
				ref={containerRef}
				className={cx('ds-scrollable flex flex-1 flex-col', containerClass)}
				onScroll={onScroll}
			>
				{/* TOOLBAR */}
				<PanelToolbar isChatView={isChatView} isPreview={isPreview}>
					{slotToolbar}
				</PanelToolbar>

				{/* CONTENT */}
				{!noContent && children}
			</div>

			{!noContent && slotFooter}
		</div>
	)
}
