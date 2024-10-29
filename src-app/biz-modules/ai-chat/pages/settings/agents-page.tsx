import { AppLayout } from '@app/layouts/app-layout'
import { PageHeader } from '@app/library/release'

const AgentsPage = () => {
	return (
		<AppLayout blank>
			<PageHeader
				breadcrumb={{ href: '/settings', title: t('core.label.settings') }}
				slotTitle={t('aiChat.label.agents')}
			/>
			TODO
		</AppLayout>
	)
}

export default AgentsPage
