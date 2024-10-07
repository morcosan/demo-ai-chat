import { AiChatNavSection } from '@app/biz-modules/ai-chat/views/nav-section'
import { ReactNode } from 'react'
import { UserSettings } from './_user-settings'

interface Props extends ReactProps {
	slotTop?: ReactNode
}

export const NavMenu = ({ slotTop, className = '' }: Props) => {
	return (
		<div className={`flex h-full w-full flex-col px-a11y-scrollbar py-scrollbar-w ${className}`}>
			{slotTop}
			<AiChatNavSection />
			<UserSettings />
		</div>
	)
}
