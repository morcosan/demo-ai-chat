import { API } from '@app/api'
import { Chat } from '@app/api/types'
import { getAppTheme, setAppTheme } from '@app/core-modules/app-theme'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const useChats = (): [Chat[], boolean] => {
	const [chats, setChats] = useState([] as Chat[])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (loading) {
			API.getChats().then((chats: Chat[]) => {
				setChats(chats)
				setLoading(false)
			})
		}
	}, [])

	return [chats, loading]
}

export const NavBar = () => {
	const [theme, setTheme] = useState(getAppTheme())
	const storybookUrl = ENV__BUILD_MODE === 'local' ? 'http://localhost:9000' : `${ENV__ROOT_URL_PATH}/storybook`
	const [chats, loading] = useChats()

	const getButtonStyle = (buttonTheme: Theme) => ({
		background: theme === buttonTheme ? 'var(--ds-color-primary)' : '',
		color: theme === buttonTheme ? 'var(--ds-color-text-inverse)' : '',
	})

	const onClickTheme = (theme: Theme) => {
		setTheme(theme)
		setAppTheme(theme)
	}

	return (
		<div className="z-sticky flex h-full w-lg-9 flex-col gap-xs-4 bg-navbar p-xs-4 shadow-xl">
			<button type="button" className="bg-primary p-xs-6 text-text-inverse">
				New chat
			</button>

			<div className="flex-1 p-xs-4">
				{loading
					? 'Loading...'
					: chats.length
						? chats.map((chat: Chat) => (
								<Link key={chat.id} to={`/chat/${chat.id}`} target="_self" className="m-xs-5 block">
									{chat.id} {chat.title}
								</Link>
							))
						: 'No chats found'}
			</div>

			<div className="flex justify-center gap-sm-0 p-xs-6">
				<button
					type="button"
					className="flex-1 p-xs-3"
					style={getButtonStyle('light')}
					onClick={onClickTheme.bind(this, 'light')}
				>
					☀️ Light
				</button>
				<button
					type="button"
					className="flex-1 p-xs-3"
					style={getButtonStyle('dark')}
					onClick={onClickTheme.bind(this, 'dark')}
				>
					🌙 Dark
				</button>
			</div>

			<div className="flex justify-center gap-md-0 p-xs-6">
				<a href={storybookUrl}>DS Docs</a>
				<Link to="/api">API Docs</Link>
			</div>

			<button type="button" className="bg-secondary p-xs-6 text-text-inverse">
				Account
			</button>
		</div>
	)
}
