import { useState } from 'react'
import { ChatView } from './_chat-view'
import { PageLayout } from './_page-layout'
import { PanelContent } from './_panel-content'

export const AiChatMainPage = () => {
	const [showsPanel, setShowsPanel] = useState(true)

	return (
		<PageLayout
			showsPanel={showsPanel}
			slotPage={<ChatView />}
			slotPanel={<PanelContent onHidePanel={() => setShowsPanel(false)} />}
			onShowPanel={() => setShowsPanel(true)}
		/>
	)
}

export default AiChatMainPage
