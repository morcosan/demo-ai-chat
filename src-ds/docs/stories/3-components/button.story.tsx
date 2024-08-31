import '@ds/docs/setup'
import { Button } from '@ds/release'
import type { StoryObj } from '@storybook/react'
import { DocsPage } from '../../components/docs-page'

export const story: StoryObj<typeof Button> = {
	args: {
		label: 'Click me',
		size: 'md',
	},
}
story.storyName = 'Button'

export default {
	id: 'Components / Button',
	title: 'Components / Button',
	argTypes: {
		label: { control: 'text', table: { category: 'Props' } },
		size: { control: 'inline-radio', options: ['xs', 'md'], table: { category: 'Props' } },
	},
	component: (props: any) => {
		return (
			<DocsPage title="Button" type="component">
				<Button {...props} />
			</DocsPage>
		)
	},
}
