import { Link, useLocation } from 'react-router-dom'
import { ApiConsole } from './api-console'

const ENDPOINTS = ['/api/chats?page=1&count=5', '/api/messages']

const ApiDocs = () => {
	const location = useLocation()

	return (
		<div className="h-screen w-screen p-sm-0 font-mono">
			{location.pathname === '/api' ? (
				ENDPOINTS.map((endpoint: string) => (
					<Link to={endpoint} key={endpoint} className="mb-xs-6 block">
						{endpoint}
					</Link>
				))
			) : (
				<ApiConsole />
			)}
		</div>
	)
}

export default ApiDocs
