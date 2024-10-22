import { PageLayout } from './_page-layout'
import { PagePanel } from './_page-panel'
import { ChatView } from './views/chat-view'

const AiChatPage = () => {
	return <PageLayout slotChatView={<ChatView />} slotSubchatView={<PagePanel />} />
}

export default AiChatPage
