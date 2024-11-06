import { Button } from '@ds/release'
import { Agent } from '../../api'

interface Props {
	agent: Agent
	selected?: boolean
	onHideNavMenu?(): void
}

export const AgentItem = (props: Props) => {
	const { agent, selected, onHideNavMenu } = props

	return (
		<li>
			<Button
				linkHref={`/chat?agent=${agent.id}`}
				variant={selected ? 'item-solid-secondary' : 'item-text-default'}
				highlight={selected ? 'selected' : 'default'}
				tooltip={agent.name}
				className="block focus:z-1"
				onClick={onHideNavMenu}
			>
				<img src={agent.avatar} alt="" className="mr-xs-4 h-sm-1 w-sm-1 rounded-full" />
				<span className="truncate">{agent.name}</span>
			</Button>
		</li>
	)
}
