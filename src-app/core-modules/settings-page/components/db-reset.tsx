import { LoadingText } from '@app/library/release'
import { Button, Modal, WarningSvg } from '@ds/release'
import { useState } from 'react'
import { API } from '../api'

export const DbReset = () => {
	const [showsConfirm, setShowsConfirm] = useState(false)
	const [showsLoading, setShowsLoading] = useState(false)

	const onConfirmReset = (random: boolean) => {
		setShowsLoading(true)

		// Page reload blocks react rendering
		wait(100).then(async () => {
			const success = await API.resetDatabase(random)
			success && location.reload()
		})
	}

	return (
		<>
			{/* BUTTON */}
			<Button variant="ghost-danger" size="sm" className="ml-auto" onClick={() => setShowsConfirm(true)}>
				Reset DB
			</Button>

			{/* MODAL */}
			<Modal
				opened={showsConfirm}
				slotTitle="Confirm resetting database"
				slotAction={
					<>
						<Button variant="solid-danger" onClick={() => onConfirmReset(true)}>
							Reset (random)
						</Button>

						<Button variant="solid-danger" onClick={() => onConfirmReset(false)}>
							Reset (empty)
						</Button>
					</>
				}
				onClose={() => setShowsConfirm(false)}
			>
				<div className="flex items-center text-color-danger-page-text">
					<WarningSvg className="mr-xs-4 w-xs-8" />
					All data will be permanently deleted
				</div>
				<div className="flex items-center">
					<WarningSvg className="mr-xs-4 w-xs-8" />
					New random data can be created
				</div>
				<div className="mt-xs-2 flex items-center">Data: account, billing, agents, chats, messages</div>
			</Modal>

			{/* LOADING OVERLAY */}
			{Boolean(showsLoading) && (
				<div className="fixed-overlay flex-center z-tooltip bg-color-modal-overlay-strong">
					<LoadingText text={t('core.state.loading')} className="text-size-xl text-color-white" />
				</div>
			)}
		</>
	)
}
