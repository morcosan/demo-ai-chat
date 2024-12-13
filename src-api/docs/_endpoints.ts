import { GPT_ID } from '@api/types'

export type EndpointType = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export interface Endpoint {
	type: EndpointType
	path: string
	params: string[]
}

export const ENDPOINTS: Endpoint[] = [
	// GET
	{ type: 'GET', path: '/api/account', params: [] },
	{ type: 'GET', path: '/api/agents', params: ['agentIds', 'count', 'page', 'search', 'everywhere'] },
	{ type: 'GET', path: '/api/billing', params: [] },
	{ type: 'GET', path: '/api/chats', params: ['chatIds', 'count', 'page', 'search'] },
	{ type: 'GET', path: '/api/gpts', params: [] },
	{ type: 'GET', path: '/api/messages', params: ['chatId', 'subchatId', 'count', 'page', 'search'] },
	{ type: 'GET', path: '/api/subchats', params: ['chatId', 'subchatIds', 'count', 'page'] },

	// POST
	{ type: 'POST', path: '/api/agents', params: ['agentId', 'gptId', 'name', 'avatar', 'desc', 'prompt'] },
	{ type: 'POST', path: '/api/chats', params: ['title'] },
	{ type: 'POST', path: '/api/messages', params: ['chatId', 'subchatId', 'text'] },

	// PATCH
	{ type: 'PATCH', path: '/api/account', params: ['name', 'email', 'phone', 'avatar'] },
	{ type: 'PATCH', path: '/api/agents', params: ['agentId', 'gptId', 'name', 'avatar', 'desc', 'prompt'] },
	{
		type: 'PATCH',
		path: '/api/billing',
		params: ['name', 'address', 'city', 'country', 'postalCode', 'vatNumber'],
	},
	{ type: 'PATCH', path: '/api/chats', params: ['chatId', 'title'] },

	// DELETE
	{ type: 'DELETE', path: '/api/agents', params: ['agentIds'] },
	{ type: 'DELETE', path: '/api/chats', params: ['chatIds'] },
	{ type: 'DELETE', path: '/api/database', params: ['random'] },
]

export const QUERY_DEFAULTS = {
	address: 'Street ABC, number 123',
	agentId: '1001',
	agentIds: '1001,1002',
	avatar: 'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png',
	chatId: '1001',
	chatIds: '1001,1002',
	city: 'Paris',
	count: '10',
	country: 'France',
	desc: 'Example description',
	email: 'john.doe@example.com',
	everywhere: 'false',
	gptId: String(GPT_ID.LOREM_IPSUM_GPT),
	name: 'John Doe',
	page: '1',
	phone: '+123456789',
	postalCode: '123456',
	prompt: 'You are an expert',
	random: 'true',
	vatNumber: 'FR123',
}

export const TYPES: EndpointType[] = ['GET', 'POST', 'PATCH', 'DELETE']

export const TYPE_COLOR = {
	GET: 'text-color-success-page-text',
	POST: 'text-color-primary-page-text',
	PATCH: 'text-color-secondary-page-text',
	DELETE: 'text-color-danger-page-text',
}
