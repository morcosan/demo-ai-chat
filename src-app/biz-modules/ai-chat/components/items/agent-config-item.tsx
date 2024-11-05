import { LoadingText } from '@app/library/release'
import { EditSvg, IconButton } from '@ds/release'
import { Agent, GPT, GPT_ID__LOREM_IPSUM, GPT_ID__RAMMUS, UI_TAG__GPT_DESCRIPTION } from '../../api'
import { useAiChatAgents } from '../../state'

interface Props extends ReactProps {
	agent: Agent
	onEdit?(): void
}

export const AgentConfigItem = (props: Props) => {
	const { agent, onEdit } = props
	const { gpts } = useAiChatAgents()

	const gpt = gpts.find((gpt: GPT) => gpt.id === agent.gptId)
	if (!gpt) return null

	const isGhost = agent.updating || agent.deleting
	const isInteractive = Boolean(onEdit)

	const description = (() => {
		if (agent.desc === UI_TAG__GPT_DESCRIPTION) {
			if (gpt.id === GPT_ID__LOREM_IPSUM) return t('aiChat.description.loremIpsumGPT')
			if (gpt.id === GPT_ID__RAMMUS) return t('aiChat.description.rammusGPT')
		}
		return agent.desc
	})()

	return (
		<li className="relative">
			<div
				className={cx(
					'flex items-center gap-xs-7 px-xs-7 py-xs-5',
					'rounded-md border border-color-border-shadow bg-color-bg-card shadow-xs',
					isGhost && 'opacity-30'
				)}
			>
				{/* AVATAR */}
				<img src={agent.avatar} alt="" className="h-sm-7 w-sm-7 rounded-full" />

				{/* BODY */}
				<div className="flex flex-1 flex-wrap items-center gap-x-xs-9 gap-y-xs-2">
					{/* TITLE */}
					<div className="w-full leading-sm lg:flex-1">
						{/* AGENT */}
						<div title={agent.name} className="mb-xs-3 line-clamp-1 font-weight-md">
							{agent.name}
						</div>

						{/* GPT */}
						<div className="flex items-center gap-xs-2">
							<img src={gpt.avatar} alt="" className="h-[1rem] w-[1rem] rounded-full" />
							<div className="line-clamp-1 flex-1 text-size-xs text-color-text-subtle">{gpt.name}</div>
						</div>
					</div>

					{/* DESCRIPTION */}
					<div
						title={description}
						className={cx(
							'line-clamp-3 w-full text-size-xs text-color-text-subtle lg:w-lg-9',
							!description && 'hidden'
						)}
					>
						{description}
					</div>
				</div>

				{/* ACTIONS */}
				{Boolean(isInteractive) && (
					<div className="-mr-xs-2 h-button-h-md min-w-button-h-md">
						{Boolean(!agent.deleting && !agent.updating) && (
							<IconButton tooltip={t('aiChat.action.editAgent')} onClick={onEdit}>
								<EditSvg className="w-xs-6" />
							</IconButton>
						)}
					</div>
				)}
			</div>

			{/* LOADING */}
			{Boolean(agent.deleting || agent.updating) && (
				<div className="absolute-center rounded-md bg-color-bg-card px-xs-5 py-xs-2 shadow-xs">
					<LoadingText
						text={agent.deleting ? t('core.state.deleting') : t('core.state.updating')}
						className="text-size-sm"
					/>
				</div>
			)}
		</li>
	)
}
