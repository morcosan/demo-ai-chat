import { mockAPI } from '@api/mock'
import { ApiResponse } from '@api/types'
import { AiChatSvg, ArrowBackSvg, Button, IconButton, TextField, useUiTheme } from '@ds/release'
import hljs from 'highlight.js'
import hljsCssDark from 'highlight.js/styles/a11y-dark.css?raw'
import hljsCssLight from 'highlight.js/styles/a11y-light.css?raw'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { Endpoint, ENDPOINTS, EndpointType, QUERY_DEFAULTS, TYPE_COLOR, TYPES } from './_endpoints'

const ApiDocsPage = () => {
	const { isUiDark } = useUiTheme()
	const location = useLocation()
	const [searchParams] = useSearchParams()
	const [endpoint, setEndpoint] = useState<Endpoint | null>(null)
	const [query, setQuery] = useState<Record<string, string>>(QUERY_DEFAULTS)
	const [resp, setResp] = useState<ApiResponse | null>(null)
	const [fetching, setFetching] = useState(false)

	const hljsCSS = isUiDark ? hljsCssDark : hljsCssLight

	const respHtml = useMemo(() => hljs.highlight(JSON.stringify(resp, null, 2), { language: 'json' }).value, [resp])

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

	return (
		<div className="h-screen w-screen overflow-x-hidden px-xs-5 py-xs-9 pb-sm-9 md:px-sm-0 md:py-sm-3">
			<style>{hljsCSS}</style>

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

						<pre
							className={cx(
								'mt-xs-2 min-h-lg-0 overflow-auto px-xs-6 py-xs-5',
								'rounded-sm border border-color-border-default bg-color-bg-coding'
							)}
						>
							{resp ? <div dangerouslySetInnerHTML={{ __html: respHtml }} /> : fetching ? 'Fetching...' : ''}
						</pre>
					</div>
				</>
			) : (
				<>
					<h1 className="mb-sm-9 flex items-center px-button-px-item">
						<Link to="/" className="flex w-fit" reloadDocument>
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
								<h2
									className={cx(
										'mb-xs-5 ml-button-px-item flex items-end font-mono text-size-xl',
										TYPE_COLOR[type]
									)}
								>
									{type}
									<span className="ml-xs-3 pb-xs-2 text-size-xs text-color-text-subtle">
										({ENDPOINTS.filter((ep: Endpoint) => ep.type === type).length})
									</span>
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
