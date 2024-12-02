import { createContext } from 'react'
import { Message } from '../../api'

export enum AiChatPreviewType {
	NONE,
	CODE,
	URL,
}

export interface Store {
	previewContent: string | null
	previewSource: Message | null
	previewType: AiChatPreviewType
	openPreview(content: string, type: AiChatPreviewType, source: Message): void
	closePreview(): void
}

export const PreviewContext = createContext<Store>({
	previewContent: null,
	previewSource: null,
	previewType: AiChatPreviewType.NONE,
	openPreview: () => {},
	closePreview: () => {},
})
