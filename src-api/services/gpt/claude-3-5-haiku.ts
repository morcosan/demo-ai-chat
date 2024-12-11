import { GptAPI } from '@api/types'
import { createClaudeAPI } from './_claude-api'

export const Claude35Haiku: GptAPI = createClaudeAPI('claude-3-5-haiku-latest')
