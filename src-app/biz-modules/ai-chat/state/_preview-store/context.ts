import { createContext } from 'react'

export enum AiChatPreviewSource {
	NONE,
	CHAT,
	SUBCHAT,
}

export interface Store {
	hasPreview: boolean
	previewMarkdown: string | null
	previewSource: AiChatPreviewSource
	previewUrl: string | null
	closePreview(): void
	openCodePreview(markdown: string, source: AiChatPreviewSource): void
	openUrlPreview(url: string, source: AiChatPreviewSource): void
}

export const PreviewContext = createContext<Store>({
	hasPreview: false,
	previewMarkdown: null,
	previewSource: AiChatPreviewSource.NONE,
	previewUrl: null,
	closePreview: () => {},
	openCodePreview: () => {},
	openUrlPreview: () => {},
})
