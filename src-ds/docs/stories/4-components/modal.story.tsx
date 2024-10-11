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
		noClose: false,
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
			noClose: 'boolean',
		},
		['slotTitle', 'slotButtons', 'children'],
		['onClose']
	),

	component: function Story(props: ModalProps) {
		const PROPS: DocsPropDef[] = []
		const SLOTS: DocsSlotDef[] = []
		const EVENTS: DocsEventDef[] = []
		const TYPES = `
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
