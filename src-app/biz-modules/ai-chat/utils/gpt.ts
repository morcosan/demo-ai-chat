import { GPT_ID__CHROME, GPT_ID__LOREM_IPSUM, GPT_ID__RAMMUS, UI_TAG__GPT_DESCRIPTION } from '../api'

export const parseGptDescription = (gptId: number, desc: string) => {
	return desc === UI_TAG__GPT_DESCRIPTION ? getGptDescription(gptId) : desc
}

export const getGptDescription = (gptId?: number) => {
	if (gptId === GPT_ID__CHROME) return t('aiChat.description.chromeGPT')
	if (gptId === GPT_ID__LOREM_IPSUM) return t('aiChat.description.loremIpsumGPT')
	if (gptId === GPT_ID__RAMMUS) return t('aiChat.description.rammusGPT')
	return ''
}
