export type EndpointType = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export interface Endpoint {
	type: EndpointType
	path: string
	params: string[]
}

export const ENDPOINTS: Endpoint[] = [
	// GET
	{ type: 'GET', path: '/api/account', params: [] },
	{ type: 'GET', path: '/api/billing', params: [] },
	{ type: 'GET', path: '/api/chats', params: ['chatIds', 'count', 'page', 'search'] },
	{ type: 'GET', path: '/api/subchats', params: ['chatId', 'subchatIds', 'count', 'page'] },
	{ type: 'GET', path: '/api/messages', params: ['chatId', 'subchatId', 'count', 'page', 'search'] },
	{ type: 'GET', path: '/api/gpts', params: [] },
	{ type: 'GET', path: '/api/agents', params: ['agentIds', 'count', 'page', 'search'] },

	// POST
	{ type: 'POST', path: '/api/chats', params: ['title'] },
	{ type: 'POST', path: '/api/messages', params: ['chatId', 'subchatId', 'text'] },

	// PATCH
	{ type: 'PATCH', path: '/api/account', params: ['name', 'email', 'phone', 'avatar'] },
	{
		type: 'PATCH',
		path: '/api/billing',
		params: ['name', 'address', 'city', 'country', 'postalCode', 'vatNumber'],
	},
	{ type: 'PATCH', path: '/api/chats', params: ['chatId', 'title'] },

	// DELETE
	{ type: 'DELETE', path: '/api/chats', params: ['chatIds'] },
	{ type: 'DELETE', path: '/api/database', params: [] },
]

export const QUERY_DEFAULTS = {
	chatId: '1001',
	chatIds: '1001,1002',
	count: '10',
	page: '1',
	name: 'John Doe',
	email: 'john.doe@example.com',
	phone: '+123456789',
	avatar: 'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png',
	address: 'Street ABC, number 123',
	city: 'Paris',
	country: 'France',
	postalCode: '123456',
	vatNumber: 'FR123',
}

export const TYPES: EndpointType[] = ['GET', 'POST', 'PATCH', 'DELETE']

export const TYPE_COLOR = {
	GET: 'text-color-success',
	POST: 'text-color-primary',
	PATCH: 'text-color-secondary-text-default',
	DELETE: 'text-color-danger',
}
