import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { createArgTypes } from '@ds/docs/setup.ts'
import { Button, ButtonProps } from '@ds/release'
import LogoutSvg from '@ds/release/icons/logout.svg'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

export const story: StoryObj<typeof Button> = {
	args: {
		variant: 'solid-primary',
		size: 'md',
		loading: false,
		disabled: false,
		pressed: false,
		linkHref: '',
		linkType: 'internal',
		tooltip: 'Tooltip',
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
			variant: [
				'solid-primary',
				'solid-secondary',
				'solid-danger',
				'text-default',
				'text-danger',
				'item-text-default',
				'item-text-danger',
			],
			size: ['xs', 'sm', 'md', 'lg'],
			loading: 'boolean',
			disabled: 'boolean',
			pressed: 'boolean',
			linkHref: 'text',
			linkType: ['internal', 'external', 'inactive'],
			tooltip: 'text',
		},
		['children'],
		['onClick']
	),

	component: (props: ButtonProps) => {
		const PROPS: DocsPropDef[] = [
			{
				name: 'variant',
				type: 'ButtonVariant',
				default: `'solid-primary'`,
				details: `Property that determines color and highlight`,
			},
			{
				name: 'size',
				type: 'ButtonSize',
				default: `'md'`,
				details: `Property that determines total height`,
			},
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
				name: 'pressed',
				type: 'boolean',
				default: `false`,
				details: `Flag for permanently showing hover / focus highlight`,
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
				default: `'internal'`,
				details: `
					Link behavior when ^linkHref^ is set
					^internal^ creates a router Link component
					^external^ creates an ^<a>^ link that opens in new tab
					^inactive^ creates an ^<a>^ link without any behavior
				`,
			},
			{
				name: 'tooltip',
				type: 'string',
				default: `undefined`,
				details: `Text to be displayed as tooltip on hover / focus`,
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
			type ButtonVariant =
				| 'solid-primary'
				| 'solid-secondary'
				| 'solid-danger'
				| 'text-default'
				| 'text-danger'
				| 'item-text-default'
				| 'item-text-danger'
			type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
			type LinkType = 'internal' | 'external' | 'inactive'
		`

		return (
			<DocsPage title="Button" type="component" slots={{ PROPS, SLOTS, EVENTS, TYPES }}>
				<Button {...props} />

				<br />
				<br />
				<br />

				<Button {...props}>
					<LogoutSvg className="mr-xs-4 h-xs-7 w-xs-7" /> With icon
				</Button>
			</DocsPage>
		)
	},
}

export default meta
