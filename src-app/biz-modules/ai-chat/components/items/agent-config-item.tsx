import { EditSvg, IconButton } from '@ds/release'
import { Agent, GPT, GPT_ID__LOREM_IPSUM, GPT_ID__RAMMUS } from '../../api'

interface Props extends ReactProps {
	agent: Agent
	gpt: GPT
	onClickEdit(): void
}

export const AgentConfigItem = ({ agent, gpt, onClickEdit }: Props) => {
	const isGhost = agent.loading || agent.deleting

	const description = (() => {
		if (agent.desc) return agent.desc
		if (gpt.id === GPT_ID__LOREM_IPSUM) return t('aiChat.description.loremIpsumGPT')
		if (gpt.id === GPT_ID__RAMMUS) return t('aiChat.description.rammusGPT')
		return ''
	})()

	return (
		<li
			className={cx(
				'relative flex items-center gap-xs-7 px-xs-7 py-xs-6',
				'before:absolute-overlay before:z-[-1] before:bg-color-bg-card',
				'before:rounded-md before:border before:border-color-border-shadow before:shadow-xs',
				isGhost && 'before:opacity-30'
			)}
		>
			{/* AVATAR */}
			<img src={agent.avatar} alt="" className="h-sm-7 w-sm-7 rounded-full" />

			{/* BODY */}
			<div className="flex flex-1 flex-wrap items-center gap-x-xs-9 gap-y-xs-2">
				{/* TITLE */}
				<div className="w-full leading-sm lg:flex-1">
					{/* AGENT */}
					<div className="mb-xs-3 line-clamp-1 font-weight-md">{agent.name}</div>

					{/* GPT */}
					<div className="flex items-center gap-xs-2">
						<img src={gpt.avatar} alt="" className="h-[1rem] w-[1rem] rounded-full" />
						<div className="line-clamp-1 flex-1 text-size-xs text-color-text-subtle">{gpt.name}</div>
					</div>
				</div>

				{/* DESCRIPTION */}
				<div
					className={cx(
						'line-clamp-3 w-full text-size-xs text-color-text-subtle lg:w-lg-9',
						!description && 'hidden'
					)}
				>
					{description}
				</div>
			</div>

			{/* ACTIONS */}
			<IconButton tooltip={t('aiChat.action.editAgent')} className="-mr-xs-2" onClick={onClickEdit}>
				<EditSvg className="w-xs-6" />
			</IconButton>
		</li>
	)
}
