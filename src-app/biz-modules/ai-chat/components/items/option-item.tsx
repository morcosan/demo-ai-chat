import { Agent, GPT, GPT_ID__LOREM_IPSUM, GPT_ID__RAMMUS, UI_TAG__GPT_DESCRIPTION } from '../../api'

interface Props {
	gpt?: GPT
	agent?: Agent
	selected?: boolean
	compact?: boolean
	subtle?: boolean
}

export const OptionItem = ({ gpt, agent, selected, compact, subtle }: Props) => {
	const avatar = gpt?.avatar || agent?.avatar || ''
	const name = gpt?.name || agent?.name || ''

	const desc = (() => {
		if (agent?.desc) {
			if (agent.desc === UI_TAG__GPT_DESCRIPTION) {
				if (agent.gptId === GPT_ID__LOREM_IPSUM) return t('aiChat.description.loremIpsumGPT')
				if (agent.gptId === GPT_ID__RAMMUS) return t('aiChat.description.rammusGPT')
			}
			return agent.desc
		}
		if (gpt?.id === GPT_ID__LOREM_IPSUM) return t('aiChat.description.loremIpsumGPT')
		if (gpt?.id === GPT_ID__RAMMUS) return t('aiChat.description.rammusGPT')
		return ''
	})()

	return (
		<span className={cx('flex items-center', !compact && 'py-xs-1')}>
			<img
				src={avatar}
				alt=""
				className={cx(
					'rounded-full',
					subtle ? 'mr-xs-3 h-xs-8 w-xs-8' : compact ? 'mr-xs-4 h-sm-0 w-sm-0' : 'mr-xs-5 h-sm-2 w-sm-2'
				)}
			/>

			<span className={cx('flex', compact ? 'items-center' : 'flex-col')}>
				<span
					className={cx(
						'line-clamp-1 min-w-fit break-all leading-sm',
						compact ? (subtle ? '' : 'mr-xs-4') : 'mb-xs-0',
						subtle && 'text-size-sm text-color-text-subtle'
					)}
				>
					{name}
				</span>

				{!subtle && (
					<span
						className={cx(
							'line-clamp-1 break-all text-size-xs',
							selected ? 'text-color-secondary-text-default' : 'text-color-text-subtle'
						)}
					>
						{desc}
					</span>
				)}
			</span>
		</span>
	)
}
