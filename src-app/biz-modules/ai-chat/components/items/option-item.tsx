import { Agent, GPT, GPT_ID__LOREM_IPSUM, GPT_ID__RAMMUS } from '../../api'

interface Props {
	gpt?: GPT
	agent?: Agent
	selected?: boolean
	compact?: boolean
}

export const OptionItem = ({ gpt, agent, selected, compact }: Props) => {
	const avatar = gpt?.avatar || agent?.avatar || ''
	const name = gpt?.name || agent?.name || ''
	const desc = (() => {
		if (agent?.desc) return agent.desc
		if (gpt?.id === GPT_ID__LOREM_IPSUM) return t('aiChat.description.loremIpsumGPT')
		if (gpt?.id === GPT_ID__RAMMUS) return t('aiChat.description.rammusGPT')
		return ''
	})()

	return (
		<span className={cx('flex items-center', !compact && 'py-xs-1')}>
			<img src={avatar} alt="" className="mr-xs-4 h-sm-0 w-sm-0 rounded-full" />

			<span className={cx('flex', compact ? 'items-center' : 'flex-col')}>
				<span className={cx('line-clamp-1 min-w-fit leading-sm', compact ? 'mr-xs-4' : 'mb-xs-0')}>{name}</span>
				<span
					className={cx(
						'line-clamp-1 break-all text-size-xs',
						selected ? 'text-color-secondary-text-default' : 'text-color-text-subtle'
					)}
				>
					{desc}
				</span>
			</span>
		</span>
	)
}
