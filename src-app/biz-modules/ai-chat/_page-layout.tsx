import { AppLayout } from '@app/layouts/app-layout'
import { useUiViewport } from '@ds/release'
import { ReactNode, useEffect } from 'react'
import { AiChatView, useAiChatLayout } from './state'

interface Props {
	slotChatView?: ReactNode
	slotSubchatView?: ReactNode
}

export const PageLayout = ({ slotChatView, slotSubchatView }: Props) => {
	const { isViewportMaxLG } = useUiViewport()
	const { activeView, setActiveView } = useAiChatLayout()

	const isSubchatView = activeView === AiChatView.MOBILE_SUBCHAT

	useEffect(() => {
		setActiveView(isViewportMaxLG ? AiChatView.MOBILE_CHAT : AiChatView.DESKTOP)

		return () => {
			setActiveView(AiChatView.NONE)
		}
	}, [isViewportMaxLG])

	return (
		<AppLayout pageClassName="flex">
			{slotChatView}

			{/* DESKTOP */}
			{activeView === AiChatView.DESKTOP && (
				<div className="relative ml-xs-2 h-full w-[30%] min-w-xl-0">
					{/* DELIMITER */}
					<div className="absolute -left-xs-1 top-0 h-full w-xs-1 bg-color-border-shadow" />
					{/* VIEW */}
					{slotSubchatView}
				</div>
			)}

			{/* MOBILE OVERLAY */}
			<div
				className={cx('absolute-overlay z-popup backdrop-blur-subtle', !isSubchatView && 'hidden')}
				style={{ top: 'var(--app-spacing-navbar-h)' }}
				onClick={() => setActiveView(AiChatView.MOBILE_CHAT)}
			/>
			{/* MOBILE CONTENT */}
			{activeView !== AiChatView.DESKTOP && (
				<div
					className={cx(
						'fixed bottom-0 left-0 right-0 z-popup ml-button-h-md',
						'border-l border-t border-color-border-shadow shadow-lg',
						'transition-transform duration-300 ease-out',
						isSubchatView ? 'translate-x-0' : 'translate-x-full'
					)}
					style={{ top: 'var(--app-spacing-navbar-h)', background: 'var(--app-color-bg-navbar)' }}
				>
					{slotSubchatView}
				</div>
			)}
		</AppLayout>
	)
}
