import { AppLayout } from '@app/layouts/app-layout'
import { IconButton, PanelOpenSvg, useUiViewport } from '@ds/release'
import { useEffect, useMemo, useState } from 'react'
import { AiChatView, useAiChatLayout } from '../../state'
import { ChatView } from './_chat-view'
import { PanelContent } from './_panel-content'

export const AiChatMainPage = () => {
	const { isViewportMaxLG } = useUiViewport()
	const { activeView, setActiveView } = useAiChatLayout()
	const [showsPanel, setShowsPanel] = useState(true)

	const isSubchatView = activeView === AiChatView.MOBILE_SUBCHAT

	useEffect(() => {
		setActiveView(isViewportMaxLG ? AiChatView.MOBILE_CHAT : AiChatView.DESKTOP)

		return () => {
			setActiveView(AiChatView.NONE)
		}
	}, [isViewportMaxLG])

	const slotPage = useMemo(() => <ChatView />, [])
	const slotPanel = useMemo(
		() => <PanelContent onShowPanel={() => setShowsPanel(true)} onHidePanel={() => setShowsPanel(false)} />,
		[]
	)

	return (
		<AppLayout>
			{slotPage}

			{/* DESKTOP */}
			{activeView === AiChatView.DESKTOP && (
				<>
					{/* SPACE HOLDER */}
					{/*<div*/}
					{/*	className={cx(*/}
					{/*		'relative h-full',*/}
					{/*		'transition-width duration-300 ease-in-out',*/}
					{/*		showsPanel ? 'w-[30%] min-w-xl-0 ml-xs-2' : 'w-0'*/}
					{/*	)}*/}
					{/*/>*/}

					{/* VISIBLE */}
					<div
						className={cx(
							'absolute right-0 top-0 z-sticky h-full w-[30%] min-w-xl-0',
							'bg-color-bg-page transition-transform duration-300 ease-in-out',
							showsPanel ? 'translate-x-0' : 'pointer-events-none translate-x-full'
						)}
					>
						{/* DELIMITER */}
						<div className="absolute -left-xs-1 top-0 h-full w-xs-1 bg-color-border-shadow" />
						{/* VIEW */}
						{slotPanel}
					</div>

					{/* HIDDEN */}
					<div className={cx('fixed right-a11y-scrollbar top-a11y-padding pt-px', showsPanel && 'hidden')}>
						<IconButton tooltip={t('core.action.showPanel')} size="sm" onClick={() => setShowsPanel(true)}>
							<PanelOpenSvg className="h-xs-7" />
						</IconButton>
					</div>
				</>
			)}

			{/* MOBILE OVERLAY */}
			<div
				className={cx('absolute-overlay backdrop-blur-subtle', !isSubchatView && 'hidden')}
				style={{ top: 'var(--app-spacing-navbar-h)', zIndex: 'calc(var(--ds-z-index-navbar) - 1)' }}
				onClick={() => setActiveView(AiChatView.MOBILE_CHAT)}
			/>
			{/* MOBILE CONTENT */}
			{activeView !== AiChatView.DESKTOP && (
				<div
					className={cx(
						'fixed bottom-0 left-0 right-0 ml-button-h-md',
						'border-l border-t border-color-border-shadow bg-color-bg-page shadow-lg',
						'transition-transform duration-300 ease-in-out',
						isSubchatView ? 'translate-x-0' : 'translate-x-full'
					)}
					style={{ top: 'var(--app-spacing-navbar-h)', zIndex: 'calc(var(--ds-z-index-navbar) - 1)' }}
				>
					{slotPanel}
				</div>
			)}
		</AppLayout>
	)
}

export default AiChatMainPage
