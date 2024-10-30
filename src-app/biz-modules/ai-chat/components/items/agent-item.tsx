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
				<img src={agent.avatar} alt="" className="mr-xs-4 h-sm-1 w-sm-1 rounded-full" />
				<span className="truncate">{agent.name}</span>
			</Button>
		</li>
	)
}
