import { CloseSvg, DeleteSvg, EditSvg, IconButton, SendSvg, TextField, TextFieldRef } from '@ds/release'
import { useEffect, useRef, useState } from 'react'
import { Chat } from '../../api'
import { useSubmittable } from '../../hooks/submittable'
import { Checkbox } from '../checkbox'
import { LoadingText } from '../loading-text'

interface Props extends ReactProps {
	chat: Chat
	interactive?: boolean
	selected?: boolean
	renaming?: boolean
	onDelete?(): void
	onRename?(): void
	onSubmitRename?(title: string): void
	onToggle?(selected: boolean): void
}

export const ChatConfigItem = (props: Props) => {
	const { chat, interactive, selected, renaming, onToggle, onRename, onDelete, onSubmitRename } = props
	const [title, setTitle] = useState(chat.title)
	const textFieldRef = useRef<TextFieldRef>(null)

	const isGhost = chat.loading || chat.deleting
	const isDifferent = title.trim() !== chat.title

	const onPressEnter = useSubmittable(() => isDifferent && onSubmitRename?.(title), [title])

	useEffect(() => {
		if (renaming) {
			setTitle(chat.title)
			textFieldRef.current?.focus()
		}
	}, [renaming])

	return (
		<li
			className={cx(
				'relative flex items-center px-button-px-item py-xs-3',
				'before:absolute-overlay before:z-[-1] before:bg-color-bg-card',
				'before:rounded-md before:border before:border-color-border-shadow before:shadow-xs',
				isGhost && 'before:opacity-30'
			)}
		>
			{Boolean(interactive) && (
				<div className={cx('-ml-button-px-item px-xs-2', (chat.deleting || chat.loading) && 'invisible')}>
					<Checkbox
						checked={selected}
						ariaDescription={chat.title}
						onChange={(selected: boolean) => onToggle?.(selected)}
					/>
				</div>
			)}

			<div className={cx('relative flex-1', isGhost && 'opacity-30')}>
				<div className="flex flex-col leading-sm">
					<div className="line-clamp-2">{chat.title}</div>
					<div className="mt-xs-1 text-size-xs text-color-text-subtle">
						{t('aiChat.xMessages', { count: chat.size })}
					</div>
				</div>

				{Boolean(renaming && !isGhost) && (
					<TextField
						ref={textFieldRef}
						id={`${chat.id}-field`}
						value={title}
						placeholder={t('aiChat.renamePlaceholder')}
						className="absolute-overlay"
						slotRight={
							<IconButton
								tooltip={t('aiChat.action.confirmRenameChat')}
								disabled={!isDifferent}
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

			{Boolean(interactive) &&
				(chat.deleting || chat.loading ? (
					<div className="flex-center pl-button-px-item">
						<LoadingText text={chat.deleting ? t('core.deleting') : t('core.loading')} />
					</div>
				) : (
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
				))}
		</li>
	)
}
