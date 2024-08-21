import { NavBar } from './layout/navbar'
import { ChatPanel } from './panels/chat-panel'
import { SubChatPanel } from './panels/sub-chat-panel'

const AiChat = () => {
	return (
		<div className="flex h-screen w-screen">
			<NavBar />

			<div className="gap-2 flex h-full w-full">
				<ChatPanel />
				<SubChatPanel />
			</div>
		</div>
	)
}

export default AiChat
