import { mockAPI } from '@api/mock'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ApiResponse, UrlQuery } from '../types'

const useQuery = () => {
	const location = useLocation()
	const params = new URLSearchParams(location.search)
	const query: UrlQuery = {}

	for (const [key, value] of params.entries()) {
		query[key] = value
	}

	return query
}

export const ApiConsole = () => {
	const location = useLocation()
	const path = location.pathname.replace(/^\/docs/, '')
	const query = useQuery()
	const [resp, setResp] = useState<ApiResponse | null>(null)
	const codeClass = 'p-xs-3 bg-color-bg-preview'

	useEffect(() => {
		!resp && mockAPI.get(path, query).then((resp: ApiResponse) => setResp(resp))
	}, [])

	return (
		<>
			URL Path:
			<pre className={codeClass}>{path}</pre>
			<br />
			URL Query:
			<pre className={codeClass}>{JSON.stringify(query, null, 2)}</pre>
			<br />
			API Response:
			<pre className={codeClass}>{resp ? JSON.stringify(resp, null, 2) : 'Loading...'}</pre>
		</>
	)
}
