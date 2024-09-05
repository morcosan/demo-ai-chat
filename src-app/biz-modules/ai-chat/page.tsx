import { ChatView } from '@app/biz-modules/ai-chat/views/chat-view.tsx'
import { SubChatView } from '@app/biz-modules/ai-chat/views/sub-chat-view.tsx'
import { AppLayout } from '@app/layouts/app-layout.tsx'

const AiChatPage = () => {
	return (
		<AppLayout pageClassName="flex">
			<ChatView />
			<SubChatView />
		</AppLayout>
	)
}

export default AiChatPage
