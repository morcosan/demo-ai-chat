import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { createArgTypes } from '@ds/docs/setup.ts'
import { Button, Modal, ModalProps, ModalRef } from '@ds/release'
import type { Meta, StoryObj } from '@storybook/react'
import { randomLongText } from '@utils/release'
import { useMemo, useRef } from 'react'

export const story: StoryObj<typeof Modal> = {
	args: {
		// Slots
		slotTitle: 'Modal title',
		slotButtons: '<button class="p-xs-3 bg-color-primary text-color-text-inverse rounded-md">Submit</button>',
		children: randomLongText(20),
		// Props
		width: 'md',
		height: 'fit',
		noClose: false,
		// Html
		className: '',
		style: {},
		// Events
	},
}
story.storyName = 'Modal'

const meta: Meta<typeof Modal> = {
	id: 'Components / Modal',
	title: 'Components / Modal',

	argTypes: createArgTypes<typeof Modal>(
		{
			width: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
			height: ['fit', 'full'],
			noClose: 'boolean',
		},
		['slotTitle', 'slotButtons', 'children']
	),

	component: function Story(props: ModalProps) {
		const PROPS: DocsPropDef[] = []
		const SLOTS: DocsSlotDef[] = []
		const EVENTS: DocsEventDef[] = []
		const TYPES = `
		`

		const modalRef = useRef(null as ModalRef | null)
		const modal1Ref = useRef(null as ModalRef | null)
		const modal2Ref = useRef(null as ModalRef | null)
		const modal3Ref = useRef(null as ModalRef | null)

		const overlapTriggers = useMemo(
			() => (
				<div className="flex gap-xs-9">
					<Button variant="solid-secondary" onClick={() => modal1Ref.current?.open()}>
						Open modal #1
					</Button>

					<Button variant="solid-secondary" onClick={() => modal2Ref.current?.open()}>
						Open modal #2
					</Button>

					<Button variant="solid-secondary" onClick={() => modal3Ref.current?.open()}>
						Open modal #3
					</Button>
				</div>
			),
			[]
		)

		const EXAMPLES = useMemo(
			() => (
				<>
					<div className="flex-center py-sm-2">{overlapTriggers}</div>

					<Modal ref={modal1Ref} slotTitle="Modal #1" width="md">
						{overlapTriggers}
					</Modal>
					<Modal ref={modal2Ref} slotTitle="Modal #2" width="md">
						{overlapTriggers}
					</Modal>
					<Modal ref={modal3Ref} slotTitle="Modal #3" width="md">
						{overlapTriggers}
					</Modal>
				</>
			),
			[]
		)

		return (
			<DocsPage title="Modal" type="component" slots={{ PROPS, SLOTS, EVENTS, TYPES, EXAMPLES }}>
				<Button variant="solid-primary" onClick={() => modalRef.current?.open()}>
					Open modal
				</Button>

				<Modal
					ref={modalRef}
					{...props}
					slotButtons={<div dangerouslySetInnerHTML={{ __html: String(props.slotButtons) }} />}
				/>
			</DocsPage>
		)
	},
}

export default meta
