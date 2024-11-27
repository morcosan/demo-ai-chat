/* eslint-disable no-var */

export {}

declare global {
	interface ChromeAI {
		languageModel: ChromeAiModel
	}

	interface ChromeAiModel {
		create(config: ChromeAiConfig): Promise<ChromeAiSession>
		capabilities(): Promise<ChromeAiCapabilities>
	}

	interface ChromeAiCapabilities {
		available: 'readily' | unknown
	}

	interface ChromeAiConfig {
		systemPrompt: string
		temperature: number
		topK: number
	}

	interface ChromeAiSession {
		prompt(message: string): Promise<string>
	}

	var ai: ChromeAI | undefined
}
