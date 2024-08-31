import { DocsHeader } from '@ds/docs/components/docs-header.tsx'
import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import '@ds/docs/setup'
import { Keyboard } from '@ds/release'
import type { StoryObj } from '@storybook/react'

export const story: StoryObj = {}
story.storyName = 'Utilities'

export default {
	id: 'Web core / Utilities',
	title: 'Web core / Utilities',

	component: () => {
		return (
			<DocsPage title="Utilities">
				<DocsHeader>Keyboard</DocsHeader>
				<pre className="docs">
					<code>enum Keyboard = {JSON.stringify(Keyboard, null, 2)}</code>
				</pre>
			</DocsPage>
		)
	},
}
