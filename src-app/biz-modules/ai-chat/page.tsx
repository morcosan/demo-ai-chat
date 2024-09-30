import { ChatView } from '@app/biz-modules/ai-chat/views/chat-view.tsx'
import { SubchatView } from '@app/biz-modules/ai-chat/views/subchat-view.tsx'
import { AppLayout } from '@app/layouts/app-layout.tsx'

const AiChatPage = () => {
	return (
		<AppLayout pageClassName="flex">
			<ChatView />
			<SubchatView />
		</AppLayout>
	)
}

export default AiChatPage
