import { CHANGELOG, LogEntry } from '@ds/changelog'
import { DocsPage } from '@ds/docs/components/docs-page'
import '@ds/docs/setup'
import { renderHtml } from '@ds/docs/utilities/docs'
import type { StoryObj } from '@storybook/react'

export const story: StoryObj = {}
story.storyName = 'Changelog'

export default {
	id: 'Changelog',
	title: 'Changelog',

	component: () => {
		const getListing = (title: string, changes: string[]) => (
			<>
				<h3 className="mb-xs-3 mt-sm-2 pl-xs-0 font-weight-lg">{title}</h3>
				<ul className="docs">
					{changes.map((change: string) => (
						<li key={change} dangerouslySetInnerHTML={{ __html: renderHtml(change) }} />
					))}
				</ul>
			</>
		)

		return (
			<DocsPage title="Changelog">
				{CHANGELOG.map((entry: LogEntry) => (
					<div key={entry.version}>
						<h2 className="mt-md-2 text-size-lg font-weight-md">
							{entry.version}{' '}
							<span className="ml-xs-4 text-size-xs font-weight-sm">- {entry.date || 'Latest'}</span>
						</h2>
						{entry.changes.docs?.length ? getListing('📚 Documentation:', entry.changes.docs) : ''}
						{entry.changes.token?.length ? getListing('🎨 Design tokens:', entry.changes.token) : ''}
						{entry.changes.asset?.length ? getListing('🖼️ Assets:', entry.changes.asset) : ''}
						{entry.changes.core?.length ? getListing('🧱 Web core:', entry.changes.core) : ''}
						{entry.changes.component?.length ? getListing('🧩 Components:', entry.changes.component) : ''}
						{entry.changes.deprecate?.length ? getListing('💀 Deprecations:', entry.changes.deprecate) : ''}
						{entry.changes.breaking?.length ? getListing('💥 Breaking changes:', entry.changes.breaking) : ''}
					</div>
				))}
			</DocsPage>
		)
	},
}
