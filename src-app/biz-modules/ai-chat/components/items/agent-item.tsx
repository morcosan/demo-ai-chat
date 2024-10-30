import { Button } from '@ds/release'
import { Agent } from '../../api'

interface Props {
	agent: Agent
	onHideNavMenu?(): void
}

export const AgentItem = ({ agent, onHideNavMenu }: Props) => {
	return (
		<li>
			<Button
				linkHref={`/chat/${agent.id}`}
				variant="item-text-default"
				highlight="default"
				tooltip={agent.name}
				className="block focus:z-1"
				onClick={onHideNavMenu}
			>
				<span className="truncate">{agent.name}</span>
			</Button>
		</li>
	)
}
