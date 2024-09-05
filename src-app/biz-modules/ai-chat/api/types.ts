export interface Chat {
	id: number
	title: string
}

export interface ChatListing {
	chats: Chat[]
	count: number
}
