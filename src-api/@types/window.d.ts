/* eslint-disable no-var */

export {}

declare global {
	interface GeminiNanoAI {
		languageModel: GeminiNanoModel
	}

	interface GeminiNanoModel {
		create(config: GeminiNanoConfig): Promise<GeminiNanoSession>
	}

	interface GeminiNanoConfig {
		systemPrompt: string
		temperature: number
		topK: number
	}

	interface GeminiNanoSession {
		prompt(message: string): Promise<string>
	}

	var ai: GeminiNanoAI | undefined
}
