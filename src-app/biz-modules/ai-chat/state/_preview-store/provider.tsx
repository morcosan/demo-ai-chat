import { useMemo, useState } from 'react'
import { AiChatPreviewSource, AiChatPreviewType, PreviewContext, Store } from './context'

export const PreviewProvider = ({ children }: ReactProps) => {
	const [previewCode, setPreviewCode] = useState<string | null>(null)
	const [previewLang, setPreviewLang] = useState<string | null>(null)
	const [previewSource, setPreviewSource] = useState<AiChatPreviewSource>(AiChatPreviewSource.NONE)
	const [previewType, setPreviewType] = useState<AiChatPreviewType>(AiChatPreviewType.NONE)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)

	const openUrlPreview = (url: string, source: AiChatPreviewSource) => {
		setPreviewCode(null)
		setPreviewLang(null)
		setPreviewSource(source)
		setPreviewType(AiChatPreviewType.URL)
		setPreviewUrl(url)
	}

	const openCodePreview = (code: string, lang: string, source: AiChatPreviewSource) => {
		setPreviewCode(code)
		setPreviewLang(lang)
		setPreviewSource(source)
		setPreviewType(AiChatPreviewType.CODE)
		setPreviewUrl(null)
	}

	const closePreview = () => {
		setPreviewCode(null)
		setPreviewLang(null)
		setPreviewSource(AiChatPreviewSource.NONE)
		setPreviewType(AiChatPreviewType.NONE)
		setPreviewUrl(null)
	}

	const store: Store = useMemo(
		() => ({
			previewCode,
			previewLang,
			previewSource,
			previewType,
			previewUrl,
			closePreview,
			openCodePreview,
			openUrlPreview,
		}),
		[previewCode, previewLang, previewSource, previewType, previewUrl]
	)

	return <PreviewContext.Provider value={store}>{children}</PreviewContext.Provider>
}
