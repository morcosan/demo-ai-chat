import { createContext } from 'react'

export enum AiChatPreviewSource {
	NONE,
	CHAT,
	SUBCHAT,
}

export enum AiChatPreviewType {
	NONE,
	CODE,
	URL,
}

export interface Store {
	previewCode: string | null
	previewLang: string | null
	previewSource: AiChatPreviewSource
	previewType: AiChatPreviewType
	previewUrl: string | null
	closePreview(): void
	openCodePreview(code: string, lang: string, source: AiChatPreviewSource): void
	openUrlPreview(url: string, source: AiChatPreviewSource): void
}

export const PreviewContext = createContext<Store>({
	previewCode: null,
	previewLang: null,
	previewSource: AiChatPreviewSource.NONE,
	previewType: AiChatPreviewType.NONE,
	previewUrl: null,
	closePreview: () => {},
	openCodePreview: () => {},
	openUrlPreview: () => {},
})
