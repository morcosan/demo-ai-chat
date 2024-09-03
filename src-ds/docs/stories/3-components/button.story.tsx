import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { createArgTypes } from '@ds/docs/setup.ts'
import { Button, ButtonProps } from '@ds/release'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

export const story: StoryObj<typeof Button> = {
	args: {
		variant: 'solid-primary',
		size: 'md',
		square: false,
		expanded: false,
		loading: false,
		disabled: false,
		noHover: false,
		linkTo: '',
		linkHref: '',
		linkType: 'new-tab',
		children: 'Click me',
		className: '',
		style: {},
		onClick: action('onClick'),
	},
}
story.storyName = 'Button'

const meta: Meta<typeof Button> = {
	id: 'Components / Button',
	title: 'Components / Button',

	argTypes: createArgTypes<typeof Button>(
		{
			variant: ['solid-primary', 'solid-secondary', 'text-default', 'text-inverse'],
			size: ['xs', 'sm', 'md', 'lg'],
			square: 'boolean',
			expanded: 'boolean',
			loading: 'boolean',
			disabled: 'boolean',
			noHover: 'boolean',
			linkTo: 'text',
			linkHref: 'text',
			linkType: ['new-tab', 'same-tab', 'inactive'],
		},
		['children'],
		['onClick']
	),

	component: (props: ButtonProps) => {
		const PROPS: DocsPropDef[] = [
			{
				name: 'variant',
				type: 'ButtonVariant',
				default: `undefined`,
				details: `Property that determines color and highlight`,
				required: true,
			},
			{
				name: 'size',
				type: 'ButtonSize',
				default: `undefined`,
				details: `Property that determines total height`,
				required: true,
			},
			{ name: 'square', type: 'boolean', default: `false`, details: `Flag for removing rounded corners` },
			{ name: 'expanded', type: 'boolean', default: `false`, details: `Flag for making the button full width` },
			{
				name: 'loading',
				type: 'boolean',
				default: `false`,
				details: `Flag for enabling loading state (non-interactive)`,
			},
			{
				name: 'disabled',
				type: 'boolean',
				default: `false`,
				details: `Flag for enabling disabled state (non-interactive)`,
			},
			{
				name: 'noHover',
				type: 'boolean',
				default: `false`,
				details: `Flag for removing the hover and focus highlight`,
			},
			{
				name: 'linkTo',
				type: 'ReactTo',
				default: `undefined`,
				details: `URL path for transforming the button into React link`,
			},
			{
				name: 'linkHref',
				type: 'string',
				default: `undefined`,
				details: `URL path for transforming the button into ^<a>^ link`,
			},
			{
				name: 'linkType',
				type: 'LinkType',
				default: `'new-tab'`,
				details: `Link behavior when ^linkTo^ or ^linkHref^ is set`,
			},
		]
		const SLOTS: DocsSlotDef[] = [
			{
				name: 'children',
				details: `Content to be rendered inside the button`,
				required: true,
			},
		]
		const EVENTS: DocsEventDef[] = [
			{
				name: 'onClick',
				details: `Event emitted when button is clicked, tapped or triggered via ^Enter^ / ^Space^ keys`,
				params: [`event: MouseEvent`],
			},
		]
		const TYPES = `
			type ButtonVariant = 'solid-primary' | 'solid-secondary' | 'text-default' | 'text-inverse'
			type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
			type LinkType = 'new-tab' | 'same-tab' | 'inactive'
		`

		return (
			<DocsPage title="Button" type="component" slots={{ PROPS, SLOTS, EVENTS, TYPES }}>
				<Button {...props} />
			</DocsPage>
		)
	},
}

export default meta
