import { CHANGELOG, LogEntry } from '@ds/changelog.ts'
import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import '@ds/docs/setup'
import { renderHtml } from '@ds/docs/utilities/docs.ts'
import type { StoryObj } from '@storybook/react'

export const story: StoryObj = {}
story.storyName = 'Changelog'

export default {
	id: 'Versioning / Changelog',
	title: 'Versioning / Changelog',

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
					<>
						<h2 className="font-size-lg mt-md-2 font-weight-lg">
							{entry.version}{' '}
							<span className="font-size-xs ml-xs-4 font-weight-sm">- {entry.date || 'Latest'}</span>
						</h2>
						{entry.changes.docs?.length ? getListing('📚 Documentation:', entry.changes.docs) : ''}
						{entry.changes.token?.length ? getListing('🎨 Design tokens:', entry.changes.token) : ''}
						{entry.changes.component?.length ? getListing('🧩 Components:', entry.changes.component) : ''}
						{entry.changes.deprecate?.length ? getListing('💀 Deprecations:', entry.changes.deprecate) : ''}
						{entry.changes.breaking?.length ? getListing('💥 Breaking changes:', entry.changes.breaking) : ''}
					</>
				))}
			</DocsPage>
		)
	},
}
