import { ArrowBackSvg, IconButton } from '@ds/release'
import { Link, useLocation } from 'react-router-dom'
import { ApiConsole } from './api-console'

const ENDPOINTS = [
	'/api/chats?page=1&count=5',
	'/api/subchats?page=1&count=5&chatId=1001',
	'/api/messages?page=1&count=5&chatId=1001',
]

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
						<IconButton tooltip={t('core.actions.back')} linkHref="/docs/api" className="mr-xs-5">
							<ArrowBackSvg className="h-xs-9" />
						</IconButton>
						API Docs
					</h1>

					<ApiConsole />
				</>
			)}
		</div>
	)
}

export default ApiDocsPage
