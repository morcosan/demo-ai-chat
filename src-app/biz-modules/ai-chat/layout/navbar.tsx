import { API } from '@app/api'
import { Chat } from '@app/api/types'
import { useColorThemeStore } from '@ds/release'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const useChatListing = () => {
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

	return { chats, loading }
}

export const NavBar = () => {
	const { isLight, isDark, changeTheme } = useColorThemeStore()
	const { chats, loading } = useChatListing()

	const storybookUrl = ENV__BUILD_MODE === 'local' ? 'http://localhost:9000' : `${ENV__ROOT_URL_PATH}/storybook`

	const getButtonStyle = (enabled: boolean) => ({
		background: enabled ? 'var(--ds-color-primary)' : '',
		color: enabled ? 'var(--ds-color-text-inverse)' : '',
	})

	const setLightTheme = () => changeTheme('light')
	const setDarkTheme = () => changeTheme('dark')

	const buttonClass = [
		'relative z-0 p-xs-6 text-color-text-inverse',
		'before:absolute-overlay before:hover:bg-color-hover before:z-[-1]',
	].join(' ')

	return (
		<div className="z-sticky flex h-full w-lg-9 flex-col gap-xs-4 bg-color-navbar p-xs-4 shadow-xl">
			<button type="button" className={buttonClass + ' bg-color-primary'}>
				New chat
			</button>

			<div className="flex-1 p-xs-4">
				{loading
					? 'Loading...'
					: chats.length
						? chats.map((chat: Chat) => (
								<Link
									key={chat.id}
									to={`/chat/${chat.id}`}
									target="_self"
									className="block p-xs-5 hover:bg-color-hover-bg"
								>
									{chat.id} {chat.title}
								</Link>
							))
						: 'No chats found'}
			</div>

			<div className="flex justify-center gap-sm-0 p-xs-6">
				<button
					type="button"
					className="flex-1 p-xs-3 hover:bg-color-hover-bg"
					style={getButtonStyle(isLight)}
					onClick={setLightTheme}
				>
					☀️ Light
				</button>
				<button
					type="button"
					className="flex-1 p-xs-3 hover:bg-color-hover-bg"
					style={getButtonStyle(isDark)}
					onClick={setDarkTheme}
				>
					🌙 Dark
				</button>
			</div>

			<div className="flex justify-center gap-md-0">
				<a href={storybookUrl} className="p-xs-6 hover:bg-color-hover-bg">
					DS Docs
				</a>
				<Link to="/api" className="p-xs-6 hover:bg-color-hover-bg">
					API Docs
				</Link>
			</div>

			<button type="button" className={buttonClass + ' bg-color-secondary'}>
				Account
			</button>
		</div>
	)
}
