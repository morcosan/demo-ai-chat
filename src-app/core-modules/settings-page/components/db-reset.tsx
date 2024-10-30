import { LoadingText } from '@app/library/release'
import { Button, Modal, WarningSvg } from '@ds/release'
import { useState } from 'react'
import { API } from '../api'

export const DbReset = () => {
	const [showsConfirm, setShowsConfirm] = useState(false)
	const [showsLoading, setShowsLoading] = useState(false)

	const onConfirmRebuild = async () => {
		setShowsLoading(true)

		const success = await API.resetDatabase()
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
					All data will be permanently deleted
				</div>
				<div className="flex items-center">
					<WarningSvg className="mr-xs-4 w-xs-8" />
					New random data will be created
				</div>
				<div className="mt-xs-2 flex items-center">Data = account + chats + messages</div>
			</Modal>

			{/* LOADING OVERLAY */}
			{Boolean(showsLoading) && (
				<div className="fixed-overlay flex-center z-tooltip bg-color-black-glass-9">
					<LoadingText text={t('core.state.loading')} className="text-size-xl text-color-white" />
				</div>
			)}
		</>
	)
}
