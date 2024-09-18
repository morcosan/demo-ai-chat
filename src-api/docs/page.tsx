import BackIcon from '@app/library/assets/icons-fa-v6/arrow-left.svg'
import { Button } from '@ds/release'
import { Link, useLocation } from 'react-router-dom'
import { ApiConsole } from './api-console'

const ENDPOINTS = ['/api/chats?page=1&count=5', '/api/messages']

const ApiDocsPage = () => {
	const location = useLocation()

	return (
		<div className="h-screen w-screen overflow-x-hidden p-sm-0 font-mono">
			{location.pathname === '/docs/api' ? (
				<>
					<h1 className="mb-sm-0 text-size-xxl font-weight-lg">API Docs</h1>

					{ENDPOINTS.map((endpoint: string) => (
						<Link key={endpoint} to={`/docs${endpoint}`} className="mb-xs-6 block">
							{endpoint}
						</Link>
					))}
				</>
			) : (
				<>
					<h1 className="mb-sm-0 flex items-center text-size-xxl font-weight-lg">
						<Button linkHref="/docs/api" variant="item-text-default" className="mr-xs-5 w-sm-4">
							<BackIcon className="h-sm-0 w-sm-0" />
						</Button>
						API Docs
					</h1>

					<ApiConsole />
				</>
			)}
		</div>
	)
}

export default ApiDocsPage
