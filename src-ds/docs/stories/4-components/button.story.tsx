import { DocsPage } from '@ds/docs/components/docs-page'
import { createArgDefaults, createArgTypes } from '@ds/docs/setup'
import { Button, ButtonProps, ButtonVariant, LogoutSvg } from '@ds/release'
import type { Meta, StoryObj } from '@storybook/react'
import { useMemo } from 'react'

export const story: StoryObj<typeof Button> = {
	args: createArgDefaults<typeof Button>(
		{
			// Slots
			children: 'Test qyp',
			tooltip: 'Tooltip',
			ariaDescription: 'Example description',
			// Props
			size: 'md',
			variant: 'solid-primary',
			highlight: 'default',
			loading: false,
			disabled: false,
			linkHref: '',
			linkType: 'internal',
			className: '',
		},
		['onClick']
	),
}
story.storyName = 'Button'

const meta: Meta<typeof Button> = {
	id: 'Components / Button',
	title: 'Components / Button',

	argTypes: createArgTypes<typeof Button>(
		['children', 'tooltip', 'ariaDescription'],
		{
			size: ['xs', 'sm', 'md', 'lg'],
			variant: [
				'solid-primary',
				'solid-secondary',
				'solid-danger',
				'ghost-primary',
				'ghost-secondary',
				'ghost-danger',
				'text-default',
				'text-subtle',
				'text-danger',
				'item-solid-secondary',
				'item-text-default',
				'item-text-danger',
			],
			highlight: ['default', 'pressed', 'selected'],
			loading: 'boolean',
			disabled: 'boolean',
			linkHref: 'text',
			linkType: ['internal', 'external', 'inactive'],
			className: 'text',
		},
		['onClick']
	),

	component: function Story(props: ButtonProps) {
		const SLOTS: DocsPropDef[] = [
			{
				name: 'children',
				type: 'ReactNode',
				details: `Content to be rendered inside the button`,
				required: true,
			},
			{
				name: 'tooltip',
				type: 'string',
				details: `Text to be displayed as tooltip on hover / focus`,
			},
			{
				name: 'ariaDescription',
				type: 'string',
				details: `Text used by screen reader as description for the button`,
			},
		]
		const PROPS: DocsPropDef[] = [
			{
				name: 'size',
				type: 'ButtonSize',
				default: `'md'`,
				details: `Property that determines total height and padding`,
			},
			{
				name: 'variant',
				type: 'ButtonVariant',
				default: `'solid-primary'`,
				details: `Property that determines color and highlight`,
			},
			{
				name: 'highlight',
				type: 'ButtonHighlight',
				default: `'default'`,
				details: `Property for enforcing a specific button highlight`,
			},
			{
				name: 'loading',
				type: 'boolean',
				default: `false`,
				details: `
					Flag for enabling loading state (non-interactive)
					It has priority over ^disabled^ prop
				`,
			},
			{
				name: 'disabled',
				type: 'boolean',
				default: `false`,
				details: `Flag for enabling disabled state (non-interactive)`,
			},
			{
				name: 'linkHref',
				type: 'string',
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
				name: 'className',
				type: 'string',
				details: `CSS class attribute for the wrapper element`,
			},
		]
		const EVENTS: DocsEventDef[] = [
			{
				name: 'onClick',
				details: `Event emitted when button is clicked, tapped or triggered via ^Enter^ / ^Space^ keys`,
				params: [`event: ReactMouseEvent`],
			},
		]
		const TYPES = `
			type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
			type ButtonVariant =
				| 'solid-primary'
				| 'solid-secondary'
				| 'solid-danger'
				| 'ghost-primary'
				| 'ghost-secondary'
				| 'ghost-danger'
				| 'text-default'
				| 'text-subtle'
				| 'text-danger'
				| 'item-solid-secondary'
				| 'item-text-default'
				| 'item-text-danger'
			type ButtonHighlight = 'default' | 'pressed' | 'selected'
			type LinkType = 'internal' | 'external' | 'inactive'
		`

		const svg = <LogoutSvg className="mr-xs-4 h-xs-7 w-xs-7" />
		const variants: ButtonVariant[] = [
			'solid-primary',
			'solid-secondary',
			'solid-danger',
			'ghost-primary',
			'ghost-secondary',
			'ghost-danger',
			'text-default',
			'text-subtle',
			'text-danger',
			'item-solid-secondary',
			'item-text-default',
			'item-text-danger',
		]
		const EXAMPLES = useMemo(
			() => (
				<div className="flex flex-wrap items-center gap-xs-7 p-xs-8">
					{variants.map((variant) => (
						<div key={variant} className="flex w-full flex-wrap items-center gap-xs-6">
							<Button variant={variant} className="w-lg-4">
								{svg} {variant}
							</Button>
							<Button variant={variant} highlight="pressed">
								{svg} pressed
							</Button>
							<Button variant={variant} highlight="selected">
								{svg} selected
							</Button>
							<Button variant={variant} loading>
								{svg} loading
							</Button>
							<Button variant={variant} disabled>
								{svg} disabled
							</Button>
							<Button variant={variant} size="xs">
								xs
							</Button>
							<Button variant={variant} size="sm">
								sm
							</Button>
							<Button variant={variant} size="md">
								md
							</Button>
							<Button variant={variant} size="lg">
								lg
							</Button>
						</div>
					))}
				</div>
			),
			[]
		)

		return (
			<DocsPage title="Button" type="component" slots={{ SLOTS, PROPS, EVENTS, TYPES, EXAMPLES }}>
				<Button {...props} />
			</DocsPage>
		)
	},
}

export default meta
