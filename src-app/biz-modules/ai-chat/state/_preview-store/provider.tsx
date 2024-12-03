import { useMemo, useState } from 'react'
import { AiChatPreviewSource, AiChatPreviewType, PreviewContext, Store } from './context'

export const PreviewProvider = ({ children }: ReactProps) => {
	const [previewContent, setPreviewContent] = useState<string | null>(null)
	const [previewSource, setPreviewSource] = useState<AiChatPreviewSource>(AiChatPreviewSource.NONE)
	const [previewType, setPreviewType] = useState<AiChatPreviewType>(AiChatPreviewType.NONE)

	const openPreview = (content: string, type: AiChatPreviewType, source: AiChatPreviewSource) => {
		setPreviewContent(content)
		setPreviewSource(source)
		setPreviewType(type)
	}

	const closePreview = () => {
		setPreviewContent(null)
		setPreviewSource(AiChatPreviewSource.NONE)
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
