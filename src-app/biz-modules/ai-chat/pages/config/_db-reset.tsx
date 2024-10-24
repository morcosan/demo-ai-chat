import { Button, Modal, WarningSvg } from '@ds/release'
import { useState } from 'react'
import { API } from '../../api'
import { LoadingText } from '../../components/loading-text'

export const DbReset = () => {
	const [showsConfirm, setShowsConfirm] = useState(false)
	const [showsLoading, setShowsLoading] = useState(false)

	const onConfirmRebuild = async () => {
		setShowsLoading(true)

		const success = await API.rebuildDatabase()
		success && location.reload()
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
				slotButtons={
					<Button variant="solid-danger" onClick={onConfirmRebuild}>
						Reset and refresh
					</Button>
				}
				onClose={() => setShowsConfirm(false)}
			>
				<div className="flex items-center text-color-danger">
					<WarningSvg className="mr-xs-4 w-xs-8" />
					All chats and messages will be permanently deleted
				</div>
				<div className="flex items-center">
					<WarningSvg className="mr-xs-4 w-xs-8" />
					New random chats and messages will be created
				</div>
			</Modal>

			{/* LOADING OVERLAY */}
			{Boolean(showsLoading) && (
				<div className="fixed-overlay flex-center z-tooltip bg-color-black-glass-9">
					<LoadingText text={t('core.loading')} className="text-size-xl text-color-white" />
				</div>
			)}
		</>
	)
}
