import { useMemo, useState } from 'react'
import { Message } from '../../api'
import { AiChatPreviewType, PreviewContext, Store } from './context'

export const PreviewProvider = ({ children }: ReactProps) => {
	const [previewContent, setPreviewContent] = useState<string | null>(null)
	const [previewSource, setPreviewSource] = useState<Message | null>(null)
	const [previewType, setPreviewType] = useState<AiChatPreviewType>(AiChatPreviewType.NONE)

	const openPreview = (content: string, type: AiChatPreviewType, source: Message) => {
		setPreviewContent(content)
		setPreviewSource(source)
		setPreviewType(type)
	}

	const closePreview = () => {
		setPreviewContent(null)
		setPreviewSource(null)
		setPreviewType(AiChatPreviewType.NONE)
	}

	const store: Store = useMemo(
		() => ({
			previewContent,
			previewSource,
			previewType,
			openPreview,
			closePreview,
		}),
		[previewContent, previewSource, previewType]
	)

	return <PreviewContext.Provider value={store}>{children}</PreviewContext.Provider>
}
