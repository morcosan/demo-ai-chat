import { Agent } from '@app/biz-modules/ai-chat/api'
import { EditSvg } from '@ds/release'
import { IconButton } from '@ds/src/components/icon-button'
import { useUiTheme } from '@ds/src/systems/ui-theme'

interface Props extends ReactProps {
	agent: Agent
	onClickEdit?(): void
}

export const AgentConfigItem = ({ agent, onClickEdit }: Props) => {
	const { $lineHeight, $fontSize } = useUiTheme()

	const isGhost = agent.loading || agent.deleting

	const description = agent.desc

	return (
		<li
			className={cx(
				'relative flex items-center gap-xs-7 px-xs-7 py-xs-6',
				'before:absolute-overlay before:z-[-1] before:bg-color-bg-card',
				'before:rounded-md before:border before:border-color-border-shadow before:shadow-xs',
				isGhost && 'before:opacity-30'
			)}
		>
			<img src={agent.avatar} alt="" className="h-sm-8 w-sm-8 rounded-full" />

			<div className="flex flex-1 flex-col gap-xs-2">
				<div className="line-clamp-1 leading-1">{agent.name}</div>
				<div
					className={cx('line-clamp-2 text-size-xs text-color-text-subtle', !description && 'hidden')}
					style={{ maxHeight: `calc(2 * ${$lineHeight['md']} * ${$fontSize['xs']})` }}
				>
					{description}
				</div>
			</div>

			<IconButton tooltip={t('aiChat.action.editAgent')} className="-mr-xs-2" onClick={onClickEdit}>
				<EditSvg className="w-xs-6" />
			</IconButton>
		</li>
	)
}
