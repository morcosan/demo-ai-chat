import { LoadingText } from '@app/library/release'
import { BuildSvg, IconButton } from '@ds/release'
import { Agent, GPT } from '../../api'
import { useAiChatAgents } from '../../state'
import { parseGptDescription } from '../../utils/gpt'

interface Props extends ReactProps {
	agent: Agent
	onEdit?(): void
}

export const AgentConfigItem = (props: Props) => {
	const { agent, onEdit } = props
	const { allGPTs } = useAiChatAgents()

	const gpt = allGPTs.find((gpt: GPT) => gpt.id === agent.gptId)
	if (!gpt) return null

	const isGhost = agent.updating || agent.deleting
	const isInteractive = Boolean(onEdit)
	const description = parseGptDescription(agent.gptId, agent.desc)

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
							<IconButton tooltip={t('aiChat.action.configureAgent')} onClick={onEdit}>
								<BuildSvg className="w-xs-7" />
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
