import { Button, Modal, WarningSvg } from '@ds/release'
import { useState } from 'react'
import { API } from '../../api'
import { LoadingText } from '../../components/loading-text'

export const DatabaseReset = () => {
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
				{t('aiChat.action.rebuildDatabase')}
			</Button>

			{/* MODAL */}
			<Modal
				opened={showsConfirm}
				slotTitle={t('aiChat.action.confirmRebuildDatabase')}
				slotButtons={
					<Button variant="solid-danger" onClick={onConfirmRebuild}>
						{t('aiChat.action.deleteAndRebuild')}
					</Button>
				}
				onClose={() => setShowsConfirm(false)}
			>
				<div className="flex items-center text-color-danger">
					<WarningSvg className="mr-xs-4 w-xs-8" />
					{t('aiChat.rebuildDatabaseWarning')}
				</div>
				<div className="flex items-center">
					<WarningSvg className="mr-xs-4 w-xs-8" />
					{t('aiChat.rebuildDatabaseWarning2')}
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
