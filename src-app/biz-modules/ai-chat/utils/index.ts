import { GPT_ID__LOREM_IPSUM, GPT_ID__RAMMUS, UI_TAG__GPT_DESCRIPTION } from '../api'

export const parseGptDescription = (gptId: number, desc: string) => {
	if (desc === UI_TAG__GPT_DESCRIPTION) {
		if (gptId === GPT_ID__LOREM_IPSUM) return t('aiChat.description.loremIpsumGPT')
		if (gptId === GPT_ID__RAMMUS) return t('aiChat.description.rammusGPT')
	}
	return desc
}
