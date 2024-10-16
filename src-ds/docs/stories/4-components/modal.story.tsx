import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { createArgTypes } from '@ds/docs/setup.ts'
import { Button, Modal, ModalProps } from '@ds/release'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { randomLongText } from '@utils/release'
import { useEffect, useMemo, useState } from 'react'

export const story: StoryObj<typeof Modal> = {
	args: {
		// Slots
		slotTitle: 'Modal title',
		slotButtons: '<button class="p-xs-3 bg-color-primary text-color-text-inverse rounded-md">Submit</button>',
		children: randomLongText(20),
		// Props
		opened: false,
		width: 'md',
		height: 'fit',
		shallow: false,
		noClose: false,
		noFooter: false,
		// Html
		className: '',
		style: {},
		// Events
		onClose: action('onClose'),
	},
}
story.storyName = 'Modal'

const meta: Meta<typeof Modal> = {
	id: 'Components / Modal',
	title: 'Components / Modal',

	argTypes: createArgTypes<typeof Modal>(
		{
			opened: 'boolean',
			width: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
			height: ['fit', 'full'],
			shallow: 'boolean',
			noClose: 'boolean',
			noFooter: 'boolean',
		},
		['slotTitle', 'slotButtons', 'children'],
		['onClose']
	),

	component: function Story(props: ModalProps) {
		const SLOTS: DocsSlotDef[] = [
			{
				name: 'slotTitle',
				details: `Content to be rendered as title for modal`,
				required: true,
			},
			{
				name: 'slotButtons',
				details: `Content to be rendered as buttons in footer (excluding close button)`,
			},
			{
				name: 'children',
				details: `Content to be rendered inside the modal`,
				required: true,
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
				name: 'shallow',
				type: 'boolean',
				default: `false`,
				details: `
					Flag for allowing the modal to close when clicking the overlay
					It also makes the overlay less prominent 	
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
				name: 'onClose',
				details: `Event emitted when any close button is clicked or when ^Escape^ key is pressed`,
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

				<Modal opened={opened1} slotTitle="Modal #1" width="sm" onClose={() => setOpened1(false)}>
					{slotTriggers}
				</Modal>
				<Modal opened={opened2} slotTitle="Modal #2" width="md" onClose={() => setOpened2(false)}>
					{slotTriggers}
				</Modal>
				<Modal opened={opened3} slotTitle="Modal #3" width="lg" onClose={() => setOpened3(false)}>
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
					slotButtons={<div dangerouslySetInnerHTML={{ __html: String(props.slotButtons) }} />}
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
