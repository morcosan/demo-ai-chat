import { GPT_ID, UI_TAG__GPT_DESCRIPTION } from '../api'

export const parseGptDescription = (gptId: number, desc: string) => {
	return desc === UI_TAG__GPT_DESCRIPTION ? getGptDescription(gptId) : desc
}

export const getGptDescription = (gptId?: number) => {
	if (gptId === GPT_ID.CHATGPT_4O) return t('aiChat.description.chatgpt4o')
	if (gptId === GPT_ID.CHATGPT_4O_MINI) return t('aiChat.description.chatgpt4oMini')
	if (gptId === GPT_ID.CHROME_GPT) return t('aiChat.description.chromeGPT')
	if (gptId === GPT_ID.CLAUDE_3_5_HAIKU) return t('aiChat.description.claude35Haiku')
	if (gptId === GPT_ID.CLAUDE_3_5_SONNET) return t('aiChat.description.claude35Sonnet')
	if (gptId === GPT_ID.LOREM_IPSUM_GPT) return t('aiChat.description.loremIpsumGPT')
	if (gptId === GPT_ID.RAMMUS_GPT) return t('aiChat.description.rammusGPT')
	return ''
}
