import { Modal } from '@ds/release'

interface Props {
	opened: boolean

	onClose?(): void
}

export const I18nModal = ({ opened, onClose }: Props) => {
	return (
		<Modal opened={opened} slotTitle="Change language" onClose={onClose}>
			asdad
		</Modal>
	)
}
