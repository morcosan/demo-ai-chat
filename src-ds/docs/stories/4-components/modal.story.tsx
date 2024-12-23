import { DocsPage } from '@ds/docs/components/docs-page'
import { createArgDefaults, createArgTypes } from '@ds/docs/setup'
import { Button, Modal, ModalProps } from '@ds/release'
import type { Meta, StoryObj } from '@storybook/react'
import { randomLongText } from '@utils/release'
import { useEffect, useMemo, useState } from 'react'

export const story: StoryObj<typeof Modal> = {
	args: createArgDefaults<typeof Modal>(
		{
			// Slots
			title: 'Modal title',
			children: randomLongText(20),
			actions:
				'<button class="p-xs-3 bg-color-primary-button-bg text-color-text-inverse rounded-md">Submit</button>',
			extras: 'Extra content',
			// Props
			opened: false,
			width: 'md',
			height: 'fit',
			noDismiss: false,
			noClose: false,
			noFooter: false,
		},
		['onOpened', 'onClose', 'onClosed']
	),
}
story.storyName = 'Modal'

const meta: Meta<typeof Modal> = {
	id: 'Components / Modal',
	title: 'Components / Modal',

	argTypes: createArgTypes<typeof Modal>(
		['title', 'children', 'actions', 'extras'],
		{
			opened: 'boolean',
			width: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
			height: ['fit', 'full'],
			noDismiss: 'boolean',
			noClose: 'boolean',
			noFooter: 'boolean',
		},
		['onOpened', 'onClose', 'onClosed']
	),

	component: function Story(props: ModalProps) {
		const SLOTS: DocsPropDef[] = [
			{
				name: 'title',
				type: 'ReactNode',
				details: `Content to be rendered as title for modal`,
				required: true,
			},
			{
				name: 'children',
				type: 'ReactNode',
				details: `Content to be rendered inside the modal`,
				required: true,
			},
			{
				name: 'actions',
				type: 'ReactNode',
				details: `Content to be rendered in footer, on the bottom-right corner, as action button`,
			},
			{
				name: 'extras',
				type: 'ReactNode',
				details: `Extra content to be rendered in footer, on the bottom-left corner`,
			},
		]
		const PROPS: DocsPropDef[] = [
			{
				name: 'opened',
				type: 'boolean',
				default: `false`,
				details: `Flag for displaying the modal`,
				required: true,
			},
			{
				name: 'width',
				type: 'ModalWidth',
				default: `'md'`,
				details: `Property that determines width and max-width for modal`,
			},
			{
				name: 'height',
				type: 'ModalHeight',
				default: `'fit'`,
				details: `Property that determines height and max-height for modal`,
			},
			{
				name: 'noDismiss',
				type: 'boolean',
				default: `false`,
				details: `
					Flag for disabling overlay click and ESC key
					It also increases the background contrast 
				`,
			},
			{
				name: 'noClose',
				type: 'boolean',
				default: `false`,
				details: `Flag for hiding all close buttons and disabling ^onClose^ event`,
			},
			{
				name: 'noFooter',
				type: 'boolean',
				default: `false`,
				details: `Flag for hiding the footer`,
			},
		]
		const EVENTS: DocsEventDef[] = [
			{
				name: 'onOpened',
				details: `Event emitted when modal is opened (after the transition animation)`,
			},
			{
				name: 'onClose',
				details: `Event emitted when any close button is clicked or when ^Escape^ key is pressed`,
			},
			{
				name: 'onClosed',
				details: `Event emitted when modal is closed (after the transition animation)`,
			},
		]
		const TYPES = `
			type ModalWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
			type ModalHeight = 'fit' | 'full'
		`

		const [opened, setOpened] = useState(false)
		const [opened1, setOpened1] = useState(false)
		const [opened2, setOpened2] = useState(false)
		const [opened3, setOpened3] = useState(false)

		useEffect(() => {
			setOpened(props.opened)
		}, [props.opened])

		const slotTriggers = useMemo(
			() => (
				<div className="flex gap-xs-5">
					<Button variant="text-default" onClick={() => setOpened1(true)}>
						Open modal #1
					</Button>
					<Button variant="text-default" onClick={() => setOpened2(true)}>
						Open modal #2
					</Button>
					<Button variant="text-default" onClick={() => setOpened3(true)}>
						Open modal #3
					</Button>
				</div>
			),
			[]
		)

		const EXAMPLES = (
			<>
				<div className="flex-center py-sm-2">{slotTriggers}</div>

				<Modal opened={opened1} title="Modal #1" width="sm" onClose={() => setOpened1(false)}>
					{slotTriggers}
				</Modal>
				<Modal opened={opened2} title="Modal #2" width="md" onClose={() => setOpened2(false)}>
					{slotTriggers}
				</Modal>
				<Modal opened={opened3} title="Modal #3" width="lg" onClose={() => setOpened3(false)}>
					{slotTriggers}
				</Modal>
			</>
		)

		return (
			<DocsPage title="Modal" type="component" slots={{ PROPS, SLOTS, EVENTS, TYPES, EXAMPLES }}>
				<Button variant="text-default" onClick={() => setOpened(true)}>
					Open modal
				</Button>

				<Modal
					{...props}
					opened={opened}
					actions={<div dangerouslySetInnerHTML={{ __html: String(props.actions) }} />}
					onClose={() => {
						setOpened(false)
						props.onClose?.()
					}}
				/>
			</DocsPage>
		)
	},
}

export default meta
