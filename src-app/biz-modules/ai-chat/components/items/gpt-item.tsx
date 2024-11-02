import { GPT, GPT_ID__LOREM_IPSUM, GPT_ID__RAMMUS } from '../../api'

interface Props {
	gpt: GPT
	selected?: boolean
}

export const GptItem = ({ gpt, selected }: Props) => {
	const description = (() => {
		if (gpt.id === GPT_ID__LOREM_IPSUM) return t('aiChat.description.loremIpsumGPT')
		if (gpt.id === GPT_ID__RAMMUS) return t('aiChat.description.rammusGPT')
		return ''
	})()

	return (
		<div className="flex items-center py-xs-1">
			<img src={gpt.avatar} alt="" className="mr-xs-4 h-sm-0 w-sm-0 rounded-full" />

			<div>
				<div className="mb-xs-0 leading-sm">{gpt.name}</div>
				<div
					className={cx('text-size-xs', selected ? 'text-color-secondary-text-default' : 'text-color-text-subtle')}
				>
					{description}
				</div>
			</div>
		</div>
	)
}
