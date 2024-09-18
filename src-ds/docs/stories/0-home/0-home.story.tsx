import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import '@ds/docs/setup'
import type { StoryObj } from '@storybook/react'

export const story: StoryObj = {}
story.storyName = 'Home'

export default {
	id: 'Home',
	title: 'Home',

	component: () => {
		return <DocsPage title="AI Chat Design System">Hello World</DocsPage>
	},
}
