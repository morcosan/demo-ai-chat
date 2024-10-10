import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { createArgTypes } from '@ds/docs/setup.ts'
import { Button, Modal, ModalProps, ModalRef } from '@ds/release'
import type { Meta, StoryObj } from '@storybook/react'
import { randomLongText } from '@utils/release'
import { useRef } from 'react'

export const story: StoryObj<typeof Modal> = {
	args: {
		title: 'Title for modal',
		width: 'md',
		expanded: false,
		noClose: false,
		children: randomLongText(),
		buttons: '<button class="p-xs-3 bg-color-primary text-color-white rounded-md">Submit</button>',
		className: '',
		style: {},
	},
}
story.storyName = 'Modal'

const meta: Meta<typeof Modal> = {
	id: 'Components / Modal',
	title: 'Components / Modal',

	argTypes: createArgTypes<typeof Modal>(
		{
			title: 'text',
			width: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
			expanded: 'boolean',
			noClose: 'boolean',
		},
		['children', 'buttons']
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

		const overlapTriggers = (
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
		)

		return (
			<DocsPage title="Modal" type="component" slots={{ PROPS, SLOTS, EVENTS, TYPES }}>
				<Button variant="solid-primary" onClick={() => modalRef.current?.open()}>
					Open modal
				</Button>

				<Modal
					ref={modalRef}
					{...props}
					buttons={<div dangerouslySetInnerHTML={{ __html: String(props.buttons) }} />}
				/>

				<div className="mt-sm-9">{overlapTriggers}</div>

				<Modal ref={modal1Ref} title="Modal #1" width="md">
					{overlapTriggers}
				</Modal>
				<Modal ref={modal2Ref} title="Modal #2" width="md">
					{overlapTriggers}
				</Modal>
				<Modal ref={modal3Ref} title="Modal #3" width="md">
					{overlapTriggers}
				</Modal>
			</DocsPage>
		)
	},
}

export default meta
