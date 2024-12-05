import { Markdown } from '@app/library/release'
import { AiChatView, useAiChatLayout } from '../state'

interface Props {
	text: string
	isSubchat?: boolean
	onPreviewCode?(code: string, lang: string): void
	onPreviewUrl?(url: string): void
}

export const MessageMarkdown = (props: Props) => {
	const { activeView, setActiveView } = useAiChatLayout()

	const openPreview = () => {
		if (activeView === AiChatView.MOBILE_CHAT) setActiveView(AiChatView.MOBILE_SUBCHAT)
		if (activeView === AiChatView.MOBILE_SUBCHAT) setActiveView(AiChatView.MOBILE_CHAT)
	}

	const onPreviewCode = (code: string, lang: string) => {
		props.onPreviewCode?.(code, lang)
		openPreview()
	}

	const onPreviewUrl = (url: string) => {
		props.onPreviewUrl?.(url)
		openPreview()
	}

	return <Markdown text={props.text} onPreviewCode={onPreviewCode} onPreviewUrl={onPreviewUrl} />
}
