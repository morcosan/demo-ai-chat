import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LoadingText } from '../../components/loading-text'
import { useAiChat } from '../../state'
import { SubchatView } from './_subchat-view'
import { SubchatsView } from './_subchats-view'

export const PagePanel = () => {
	const {
		activeChat,
		activeSubchat,
		allSubchats,
		allSubchatsLoading,
		chatLoading,
		subchatLoading,
		loadActiveSubchat,
		resetActiveSubchat,
	} = useAiChat()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const subchatId = parseInt(String(searchParams.get('subchat')))

	const resetSubchatUrl = () => {
		searchParams.delete('subchat')
		navigate({ search: searchParams.toString() }, { replace: true })
	}

	const loadSubchat = async () => {
		const success = await loadActiveSubchat(subchatId)
		if (success === false) {
			resetSubchatUrl()
		}
	}

	useEffect(() => {
		subchatId ? loadSubchat() : resetActiveSubchat()
	}, [activeChat, subchatId])

	return !activeChat ? (
		<div />
	) : activeSubchat ? (
		<SubchatView />
	) : chatLoading === 'full' || allSubchatsLoading === 'full' ? (
		<LoadingText text={t('aiChat.loadingSubchats')} className="flex-center h-full" />
	) : !allSubchats.length && !subchatLoading ? (
		<div className="flex-center h-full w-full text-color-text-subtle">{t('aiChat.noSubchats')}</div>
	) : (
		<SubchatsView />
	)
}
