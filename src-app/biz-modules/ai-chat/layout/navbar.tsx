import { API } from '@app/api'
import { Chat } from '@app/api/types'
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
	const storybookUrl = ENV__BUILD_MODE === 'local' ? 'http://localhost:9000' : `${ENV__ROOT_URL_PATH}/storybook`
	const [chats, loading] = useChats()

	return (
		<div className="z-sticky flex h-full w-lg-9 flex-col gap-xs-4 bg-navbar p-xs-4 shadow-xl">
			<button className="bg-grey-2 p-xs-6">New chat</button>

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

			<div className="flex justify-center gap-md-0">
				<a href={storybookUrl}>DS Docs</a>
				<Link to={'/api'}>API Docs</Link>
			</div>

			<button className="bg-grey-2 p-xs-6">Account</button>
		</div>
	)
}
