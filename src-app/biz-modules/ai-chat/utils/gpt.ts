import {
	GPT_ID__CHATGPT_4O,
	GPT_ID__CHATGPT_4O_MINI,
	GPT_ID__CHROME_GPT,
	GPT_ID__LOREM_IPSUM_GPT,
	GPT_ID__RAMMUS_GPT,
	UI_TAG__GPT_DESCRIPTION,
} from '../api'

export const parseGptDescription = (gptId: number, desc: string) => {
	return desc === UI_TAG__GPT_DESCRIPTION ? getGptDescription(gptId) : desc
}

export const getGptDescription = (gptId?: number) => {
	if (gptId === GPT_ID__CHATGPT_4O) return t('aiChat.description.chatgpt4o')
	if (gptId === GPT_ID__CHATGPT_4O_MINI) return t('aiChat.description.chatgpt4oMini')
	if (gptId === GPT_ID__CHROME_GPT) return t('aiChat.description.chromeGPT')
	if (gptId === GPT_ID__LOREM_IPSUM_GPT) return t('aiChat.description.loremIpsumGPT')
	if (gptId === GPT_ID__RAMMUS_GPT) return t('aiChat.description.rammusGPT')
	return ''
}
