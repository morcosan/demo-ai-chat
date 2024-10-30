import { DbReset } from '@app/core-modules/settings-page/components/db-reset'
import { AppLayout } from '@app/layouts/app-layout'
import { PageHeader } from '@app/library/release'
import { Button, ChatsSvg, MoneySvg, RobotSvg, UserSvg } from '@ds/release'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface Subsection {
	href: string
	title: string
	icon: ReactNode
}

const SettingsPage = () => {
	useTranslation()
	
	const subsections: Subsection[] = [
		{
			href: '/settings/agents',
			title: t('aiChat.action.manageAgents'),
			icon: <RobotSvg className="h-xs-8 w-sm-1" />,
		},
		{
			href: '/settings/chats',
			title: t('aiChat.action.manageChats'),
			icon: <ChatsSvg className="h-xs-8 w-sm-1" />,
		},
		{
			href: '/settings/account',
			title: t('userAccount.action.manageAccount'),
			icon: <UserSvg className="h-xs-8 w-sm-1" />,
		},
		{
			href: '/settings/billing',
			title: t('userAccount.action.manageBilling'),
			icon: <MoneySvg className="h-xs-8 w-sm-1" />,
		},
	]

	return (
		<AppLayout blank>
			<PageHeader
				slotTitle={t('core.label.settings')}
				slotRight={(ENV__BUILD_MODE === 'local' || ENV__BUILD_MODE === 'dev') && <DbReset />}
			/>

			<ul className="mt-sm-0 flex flex-col gap-xs-5">
				{subsections.map((subsection: Subsection) => (
					<li key={subsection.href}>
						<Button
							linkHref={subsection.href}
							variant="item-text-default"
							size="lg"
							className="-ml-button-px-item block w-fit text-size-lg text-color-primary"
						>
							{subsection.icon}
							<span className="ml-xs-5 mr-xs-2 pb-xs-0">{subsection.title}</span>
						</Button>
					</li>
				))}
			</ul>
		</AppLayout>
	)
}

export default SettingsPage
