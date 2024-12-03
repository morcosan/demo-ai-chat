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
	previewContent: string | null
	previewSource: AiChatPreviewSource
	previewType: AiChatPreviewType
	openPreview(content: string, type: AiChatPreviewType, source: AiChatPreviewSource): void
	closePreview(): void
}

export const PreviewContext = createContext<Store>({
	previewContent: null,
	previewSource: AiChatPreviewSource.NONE,
	previewType: AiChatPreviewType.NONE,
	openPreview: () => {},
	closePreview: () => {},
})
