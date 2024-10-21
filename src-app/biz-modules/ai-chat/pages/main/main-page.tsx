import { ChatView } from './_chat-view'
import { PageLayout } from './_page-layout'
import { PagePanel } from './_page-panel'

export const AiChatMainPage = () => {
	return <PageLayout slotChatView={<ChatView />} slotSubchatView={<PagePanel />} />
}

export default AiChatMainPage
