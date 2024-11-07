import { Button } from '@ds/release'
import { Agent } from '../../api'

interface Props {
	agent: Agent
	selected?: boolean
	onClick?(): void
}

export const AgentItem = (props: Props) => {
	const { agent, selected, onClick } = props

	return (
		<li>
			<Button
				linkHref="/chat"
				variant={selected ? 'item-solid-secondary' : 'item-text-default'}
				highlight={selected ? 'selected' : 'default'}
				tooltip={agent.name}
				className="block focus:z-1"
				onClick={onClick}
			>
				<img src={agent.avatar} alt="" className="mr-xs-4 h-sm-1 w-sm-1 rounded-full" />
				<span className="truncate">{agent.name}</span>
			</Button>
		</li>
	)
}
