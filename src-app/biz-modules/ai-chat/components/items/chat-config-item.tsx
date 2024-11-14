import { LoadingText } from '@app/library/release'
import { CloseSvg, DeleteSvg, EditSvg, IconButton, SendSvg, TextField, TextFieldRef } from '@ds/release'
import { useEffect, useRef, useState } from 'react'
import { Chat } from '../../api'
import { useSubmittable } from '../../hooks/submittable'
import { Checkbox } from '../checkbox'

interface Props extends ReactProps {
	chat: Chat
	selected?: boolean
	renaming?: boolean
	onDelete?(): void
	onRename?(): void
	onSubmitRename?(title: string): void
	onToggle?(selected: boolean): void
}

export const ChatConfigItem = (props: Props) => {
	const { chat, selected, renaming, onToggle, onRename, onDelete, onSubmitRename } = props
	const [title, setTitle] = useState(chat.title)
	const textFieldRef = useRef<TextFieldRef>(null)

	const isGhost = chat.updating || chat.deleting
	const isDifferent = title.trim() !== chat.title
	const isInteractive = Boolean(onToggle || onRename || onDelete || onSubmitRename)

	const onPressEnter = useSubmittable(() => isDifferent && onSubmitRename?.(title), [title])

	useEffect(() => {
		if (renaming) {
			setTitle(chat.title)
			textFieldRef.current?.focus()
		}
	}, [renaming])

	return (
		<li className="relative">
			<div
				className={cx(
					'flex items-center px-button-px-item py-xs-3',
					'rounded-md border border-color-border-shadow bg-color-bg-card shadow-xs',
					isGhost && 'opacity-30'
				)}
			>
				{/* CHECKBOX */}
				{Boolean(isInteractive) && (
					<div className={cx('-ml-button-px-item px-xs-2', (chat.deleting || chat.updating) && 'invisible')}>
						<Checkbox
							checked={selected}
							ariaDescription={chat.title}
							onChange={(selected: boolean) => onToggle?.(selected)}
						/>
					</div>
				)}

				{/* TITLE */}
				<div className={cx('relative flex-1', isGhost && 'opacity-30')}>
					<div className="flex flex-col leading-sm">
						<div className="line-clamp-2">{chat.title}</div>
						<div className="mt-xs-1 text-size-xs text-color-text-subtle">
							{t('aiChat.label.xMessages', { count: chat.size })}
						</div>
					</div>

					{/* RENAME */}
					{Boolean(renaming && !isGhost) && (
						<TextField
							ref={textFieldRef}
							id={`${chat.id}-field`}
							variant="primary"
							value={title}
							placeholder={t('aiChat.placeholder.rename')}
							className="absolute-overlay bg-color-bg-card"
							slotRight={
								<IconButton
									tooltip={isDifferent ? t('aiChat.action.confirmRenameChat') : t('core.error.noChanges')}
									variant="solid-primary"
									size="xs"
									className="mr-xs-2 self-center"
									onClick={() => isDifferent && onSubmitRename?.(title)}
								>
									<SendSvg className="h-xs-5" />
								</IconButton>
							}
							multiline
							onChange={setTitle}
							onSubmit={onPressEnter}
						/>
					)}
				</div>

				{/* ACTIONS */}
				{Boolean(isInteractive && !chat.deleting && !chat.updating) && (
					<div className="flex-center -mr-button-px-item ml-auto pl-xs-2 pr-xs-3">
						<IconButton
							tooltip={renaming ? t('core.action.close') : t('core.action.rename')}
							variant="text-default"
							size="sm"
							className="mr-xs-0"
							ariaDescription={chat.title}
							onClick={onRename}
						>
							{renaming ? <CloseSvg className="w-xs-5" /> : <EditSvg className="w-xs-7" />}
						</IconButton>
						<IconButton
							tooltip={t('core.action.delete')}
							variant="text-danger"
							size="sm"
							ariaDescription={chat.title}
							onClick={onDelete}
						>
							<DeleteSvg className="w-xs-6" />
						</IconButton>
					</div>
				)}
			</div>

			{/* LOADING */}
			{Boolean(chat.deleting || chat.updating) && (
				<div className="absolute-center rounded-md bg-color-bg-card px-xs-5 py-xs-2 shadow-xs">
					<LoadingText
						text={chat.deleting ? t('core.state.deleting') : t('core.state.updating')}
						className="text-size-sm"
					/>
				</div>
			)}
		</li>
	)
}
