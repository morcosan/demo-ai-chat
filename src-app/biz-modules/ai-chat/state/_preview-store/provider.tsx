import { useMemo, useState } from 'react'
import { AiChatPreviewSource, PreviewContext, Store } from './context'

export const PreviewProvider = ({ children }: ReactProps) => {
	const [previewMarkdown, setPreviewMarkdown] = useState<string | null>(null)
	const [previewSource, setPreviewSource] = useState<AiChatPreviewSource>(AiChatPreviewSource.NONE)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)

	const hasPreview = Boolean((previewUrl || previewMarkdown) && previewSource !== AiChatPreviewSource.NONE)

	const openUrlPreview = (url: string, source: AiChatPreviewSource) => {
		setPreviewMarkdown(null)
		setPreviewSource(source)
		setPreviewUrl(url)
	}

	const openCodePreview = (markdown: string, source: AiChatPreviewSource) => {
		setPreviewMarkdown(markdown)
		setPreviewSource(source)
		setPreviewUrl(null)
	}

	const closePreview = () => {
		setPreviewMarkdown(null)
		setPreviewSource(AiChatPreviewSource.NONE)
		setPreviewUrl(null)
	}

	const store: Store = useMemo(
		() => ({
			hasPreview,
			previewMarkdown,
			previewSource,
			previewUrl,
			closePreview,
			openCodePreview,
			openUrlPreview,
		}),
		[previewMarkdown, previewSource, previewUrl]
	)

	return <PreviewContext.Provider value={store}>{children}</PreviewContext.Provider>
}
