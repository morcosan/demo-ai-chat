import { useMemo, useState } from 'react'
import { AiChatPreviewSource, PreviewContext, Store } from './context'

export const PreviewProvider = ({ children }: ReactProps) => {
	const [previewCode, setPreviewCode] = useState<string | null>(null)
	const [previewLang, setPreviewLang] = useState<string | null>(null)
	const [previewSource, setPreviewSource] = useState<AiChatPreviewSource>(AiChatPreviewSource.NONE)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)

	const hasPreview = Boolean(
		(previewUrl || (previewCode && previewLang)) && previewSource !== AiChatPreviewSource.NONE
	)

	const openUrlPreview = (url: string, source: AiChatPreviewSource) => {
		setPreviewCode(null)
		setPreviewLang(null)
		setPreviewSource(source)
		setPreviewUrl(url)
	}

	const openCodePreview = (code: string, lang: string, source: AiChatPreviewSource) => {
		setPreviewCode(code)
		setPreviewLang(lang)
		setPreviewSource(source)
		setPreviewUrl(null)
	}

	const closePreview = () => {
		setPreviewCode(null)
		setPreviewLang(null)
		setPreviewSource(AiChatPreviewSource.NONE)
		setPreviewUrl(null)
	}

	const store: Store = useMemo(
		() => ({
			hasPreview,
			previewCode,
			previewLang,
			previewSource,
			previewUrl,
			closePreview,
			openCodePreview,
			openUrlPreview,
		}),
		[previewCode, previewLang, previewSource, previewUrl]
	)

	return <PreviewContext.Provider value={store}>{children}</PreviewContext.Provider>
}
