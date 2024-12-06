import { createContext } from 'react'

export enum AiChatPreviewSource {
	NONE,
	CHAT,
	SUBCHAT,
}

export interface Store {
	hasPreview: boolean
	previewCode: string | null
	previewLang: string | null
	previewSource: AiChatPreviewSource
	previewUrl: string | null
	closePreview(): void
	openCodePreview(code: string, lang: string, source: AiChatPreviewSource): void
	openUrlPreview(url: string, source: AiChatPreviewSource): void
}

export const PreviewContext = createContext<Store>({
	hasPreview: false,
	previewCode: null,
	previewLang: null,
	previewSource: AiChatPreviewSource.NONE,
	previewUrl: null,
	closePreview: () => {},
	openCodePreview: () => {},
	openUrlPreview: () => {},
})
