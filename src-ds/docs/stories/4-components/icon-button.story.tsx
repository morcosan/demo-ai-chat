import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { createArgTypes } from '@ds/docs/setup.ts'
import { IconButton, IconButtonProps, IconButtonVariant, LogoutSvg } from '@ds/release'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { useMemo } from 'react'

export const story: StoryObj<typeof IconButton> = {
	args: {
		// Props
		tooltip: 'Tooltip',
		size: 'md',
		variant: 'text-default',
		pressed: false,
		loading: false,
		disabled: false,
		linkHref: '',
		linkType: 'internal',
		// Html
		className: '',
		style: {},
		// Events
		onClick: action('onClick'),
	},
}
story.storyName = 'Icon Button'

const meta: Meta<typeof IconButton> = {
	id: 'Components / Icon Button',
	title: 'Components / Icon Button',

	argTypes: createArgTypes<typeof IconButton>(
		{
			tooltip: 'text',
			size: ['xs', 'sm', 'md', 'lg'],
			variant: ['text-default', 'text-danger', 'solid-primary', 'solid-secondary', 'solid-danger'],
			pressed: 'boolean',
			loading: 'boolean',
			disabled: 'boolean',
			linkHref: 'text',
			linkType: ['internal', 'external', 'inactive'],
		},
		[],
		['onClick']
	),

	component: function Story(props: IconButtonProps) {
		const SLOTS: DocsSlotDef[] = [
			{
				name: 'children',
				details: `Icon to be rendered inside the button`,
				required: true,
			},
		]
		const PROPS: DocsPropDef[] = [
			{
				name: 'tooltip',
				type: 'string',
				details: `Text to be displayed as tooltip on hover / focus`,
				required: true,
			},
			{
				name: 'size',
				type: 'IconButtonSize',
				default: `'md'`,
				details: `Property that determines total height and padding`,
			},
			{
				name: 'variant',
				type: 'IconButtonVariant',
				default: `'text-default'`,
				details: `Property that determines color and highlight`,
			},
			{
				name: 'pressed',
				type: 'boolean',
				default: `false`,
				details: `Flag for enforcing the highlight for pressed state`,
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
		]
		const EVENTS: DocsEventDef[] = [
			{
				name: 'onClick',
				details: `Event emitted when button is clicked, tapped or triggered via ^Enter^ / ^Space^ keys`,
				params: [`event: MouseEvent`],
			},
		]
		const TYPES = `
			type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg'
			type IconButtonVariant =
				| 'text-default'
				| 'text-danger'
				| 'solid-primary'
				| 'solid-secondary'
				| 'solid-danger'
			type LinkType = 'internal' | 'external' | 'inactive'
		`

		const svg = <LogoutSvg className="h-xs-7 w-xs-7" />
		const variants: IconButtonVariant[] = [
			'text-default',
			'text-danger',
			'solid-primary',
			'solid-secondary',
			'solid-danger',
		]
		const EXAMPLES = useMemo(
			() => (
				<div className="flex flex-wrap items-center gap-xs-7 p-sm-0">
					{variants.map((variant) => (
						<div key={variant} className="flex w-full flex-wrap items-center gap-xs-7">
							<IconButton tooltip={variant} variant={variant}>
								{svg}
							</IconButton>
							<IconButton tooltip={variant + ' pressed'} variant={variant} pressed>
								{svg}
							</IconButton>
							<IconButton tooltip={variant + ' loading'} variant={variant} loading>
								{svg}
							</IconButton>
							<IconButton tooltip={variant + ' disabled'} variant={variant} disabled>
								{svg}
							</IconButton>
							<IconButton tooltip={variant + ' xs'} variant={variant} size="xs">
								{svg}
							</IconButton>
							<IconButton tooltip={variant + ' sm'} variant={variant} size="sm">
								{svg}
							</IconButton>
							<IconButton tooltip={variant + ' md'} variant={variant} size="md">
								{svg}
							</IconButton>
							<IconButton tooltip={variant + ' lg'} variant={variant} size="lg">
								{svg}
							</IconButton>
						</div>
					))}
				</div>
			),
			[]
		)

		return (
			<DocsPage title="Icon Button" type="component" slots={{ SLOTS, PROPS, EVENTS, TYPES, EXAMPLES }}>
				<IconButton {...props}>{svg}</IconButton>
			</DocsPage>
		)
	},
}

export default meta
