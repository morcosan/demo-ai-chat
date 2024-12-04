import { Agent, GPT } from '../../api'
import { getGptDescription, parseGptDescription } from '../../utils/gpt'

interface Props extends ReactProps {
	gpt?: GPT
	agent?: Agent
	selected?: boolean
	compact?: boolean
	subtle?: boolean
}

export const AgentGptItem = (props: Props) => {
	const { gpt, agent, selected, compact, subtle, className } = props

	const loading = !gpt && !agent

	const avatar = gpt?.avatar || agent?.avatar || ''
	const name = gpt?.name || agent?.name || ''
	const desc = agent?.desc ? parseGptDescription(agent.gptId, agent.desc) : getGptDescription(gpt?.id)

	const avatarClass = cx(
		'rounded-full',
		subtle ? 'mr-xs-3 h-xs-8 w-xs-8' : compact ? 'mr-xs-4 h-sm-0 w-sm-0' : 'mr-xs-5 h-sm-2 w-sm-2'
	)

	const nameClass = cx(
		'line-clamp-1 min-w-fit break-all leading-sm',
		compact ? (subtle ? '' : 'mr-xs-4') : 'mb-xs-0',
		subtle && 'text-size-sm text-color-text-subtle'
	)

	return (
		<span className={cx('flex items-center', !compact && 'py-xs-1', className)}>
			{loading ? (
				<span className={cx(avatarClass, 'animate-pulse bg-color-text-placeholder')} />
			) : (
				<img src={avatar} alt="" className={avatarClass} />
			)}

			<span className={cx('flex', compact ? 'items-center' : 'flex-col')}>
				{loading ? (
					<span className={cx(nameClass, 'min-w-lg-0 animate-pulse rounded-xs bg-color-text-placeholder')}>
						&nbsp;
					</span>
				) : (
					<span className={nameClass}>{name}</span>
				)}

				{!subtle && !loading && (
					<span
						className={cx(
							'line-clamp-1 break-all text-size-xs',
							selected ? 'text-color-secondary-button-text' : 'text-color-text-subtle'
						)}
					>
						{desc}
					</span>
				)}
			</span>
		</span>
	)
}
