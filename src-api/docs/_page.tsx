import { mockAPI } from '@api/mock'
import { ApiResponse } from '@api/types'
import { AiChatSvg, ArrowBackSvg, Button, IconButton, TextField, useUiTheme } from '@ds/release'
import hljs from 'highlight.js'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'

type EndpointType = 'GET' | 'POST' | 'PATCH' | 'DELETE'

interface Endpoint {
	type: EndpointType
	path: string
	params: string[]
}

const ENDPOINTS: Endpoint[] = [
	{ type: 'GET', path: '/api/account', params: [] },
	{ type: 'GET', path: '/api/billing', params: [] },
	{ type: 'GET', path: '/api/chats', params: ['chatIds', 'count', 'page', 'search'] },
	{ type: 'GET', path: '/api/subchats', params: ['chatId', 'subchatIds', 'count', 'page'] },
	{ type: 'GET', path: '/api/messages', params: ['chatId', 'subchatId', 'count', 'page', 'search'] },
	{ type: 'POST', path: '/api/chats', params: ['title'] },
	{ type: 'POST', path: '/api/messages', params: ['chatId', 'subchatId', 'text'] },
	{ type: 'PATCH', path: '/api/account', params: ['name', 'email', 'phone', 'avatar'] },
	{
		type: 'PATCH',
		path: '/api/billing',
		params: ['name', 'address', 'city', 'country', 'postalCode', 'vatNumber'],
	},
	{ type: 'PATCH', path: '/api/chats', params: ['chatId', 'title'] },
	{ type: 'DELETE', path: '/api/chats', params: ['chatIds'] },
	{ type: 'DELETE', path: '/api/database', params: [] },
]

const QUERY_DEFAULTS = {
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

const TYPES: EndpointType[] = ['GET', 'POST', 'PATCH', 'DELETE']

const TYPE_COLOR = {
	GET: 'text-color-success',
	POST: 'text-color-primary',
	PATCH: 'text-color-secondary-text-default',
	DELETE: 'text-color-danger',
}

const ApiDocsPage = () => {
	const { isUiDark } = useUiTheme()
	const location = useLocation()
	const [searchParams] = useSearchParams()
	const [endpoint, setEndpoint] = useState<Endpoint | null>(null)
	const [query, setQuery] = useState<Record<string, string>>(QUERY_DEFAULTS)
	const [resp, setResp] = useState<ApiResponse | null>(null)
	const [fetching, setFetching] = useState(false)

	const respHtml = useMemo(() => hljs.highlight(JSON.stringify(resp, null, 2), { language: 'json' }).value, [resp])

	const onClickLogo = (event: ReactMouseEvent) => {
		event.preventDefault()
		window.location.assign(ENV__ROOT_URL_PATH + '/') // Forced refresh
	}

	const onSubmit = useCallback(async () => {
		const path = location.pathname.replace('/docs', '')
		let resp = null

		setFetching(true)
		if (endpoint?.type === 'GET') resp = await mockAPI.get(path, query)
		if (endpoint?.type === 'POST') resp = await mockAPI.post(path, query)
		if (endpoint?.type === 'PATCH') resp = await mockAPI.patch(path, query)
		if (endpoint?.type === 'DELETE') resp = await mockAPI.delete(path, query)
		setResp(resp)
		setFetching(false)
	}, [location, query, endpoint])

	useEffect(() => {
		const path = location.pathname.replace('/docs', '')
		const type = searchParams.get('type')
		setEndpoint(ENDPOINTS.find((endpoint: Endpoint) => endpoint.path === path && endpoint.type === type) || null)
		setResp(null)
		setQuery(QUERY_DEFAULTS)
	}, [location])

	useEffect(() => {
		isUiDark ? import('highlight.js/styles/a11y-dark.css') : import('highlight.js/styles/a11y-light.css')
	}, [])

	return (
		<div className="h-screen w-screen overflow-x-hidden px-xs-5 py-xs-9 pb-sm-9 md:px-sm-0 md:py-sm-3">
			{endpoint ? (
				<>
					<h1 className="mb-sm-5 flex items-center font-mono text-size-xl">
						<IconButton tooltip={t('core.action.back')} linkHref="/docs/api" className="mr-xs-3">
							<ArrowBackSvg className="h-xs-7" />
						</IconButton>
						<span className="font-mono">
							<span className={cx('font-weight-lg', TYPE_COLOR[endpoint.type])}>{endpoint.type}</span>
							<span className="ml-xs-5">{endpoint.path}</span>
						</span>
					</h1>

					<div className="mb-xs-9 px-button-px-item">
						<span className="text-size-lg text-color-text-subtle">Params</span>

						<ul className="mt-xs-9 flex flex-col gap-xs-5">
							{endpoint.params.map((param: string) => (
								<li key={param} className="flex items-center">
									<label htmlFor={param} className="w-md-6 font-mono">
										{param}
									</label>
									<TextField
										id={param}
										value={query[param] || ''}
										className="flex-1"
										onChange={(value: string) => setQuery({ ...query, [param]: value })}
									/>
								</li>
							))}
							{!endpoint.params.length && 'None'}
						</ul>
						<Button
							variant="solid-primary"
							size="sm"
							loading={fetching}
							className="mt-sm-0 block"
							onClick={onSubmit}
						>
							Submit
						</Button>
					</div>

					<div className="mt-sm-7 px-button-px-item">
						<span className="text-size-lg text-color-text-subtle">Response</span>

						<pre className="mt-xs-2 min-h-lg-0 overflow-auto bg-color-bg-preview p-xs-3">
							{resp ? <div dangerouslySetInnerHTML={{ __html: respHtml }} /> : fetching ? 'Fetching...' : ''}
						</pre>
					</div>
				</>
			) : (
				<>
					<h1 className="mb-sm-9 flex items-center px-button-px-item">
						<Link to="/" className="flex w-fit" onClick={onClickLogo}>
							<span className="flex items-center">
								<AiChatSvg className="mr-xs-3 h-sm-1 w-sm-1 animate-pulse" />
								<span className="text-size-xl font-weight-md">AI Chat</span>
							</span>
						</Link>

						<span className="ml-xs-5 text-size-xl">/ API Docs</span>
					</h1>

					<div className="flex flex-wrap gap-sm-9">
						{TYPES.map((type: EndpointType) => (
							<div key={type}>
								<h2 className={cx('mb-xs-5 ml-button-px-item font-mono text-size-xl', TYPE_COLOR[type])}>
									{type}
								</h2>

								<ul className="flex flex-col">
									{ENDPOINTS.filter((ep: Endpoint) => ep.type === type).map((endpoint: Endpoint) => (
										<li key={endpoint.path}>
											<Button
												linkHref={`/docs${endpoint.path}?type=${type}`}
												variant="item-text-default"
												size="lg"
												className="block w-lg-6"
											>
												<span className="font-mono">
													<span className={cx('font-weight-lg', TYPE_COLOR[type])}>{type}</span>
													<span className="ml-xs-5">{endpoint.path}</span>
												</span>
											</Button>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	)
}

export default ApiDocsPage
