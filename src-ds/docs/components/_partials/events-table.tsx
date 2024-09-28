import { DocsHeader } from '@ds/docs/components/docs-header'
import { renderHtml } from '@ds/docs/utilities/docs'

interface Props {
	eventDefs: DocsEventDef[]
}

export const EventsTable = ({ eventDefs }: Props) => {
	return (
		<>
			<DocsHeader>Events</DocsHeader>

			<table className="docs">
				<thead>
					<tr>
						<th>Event</th>
						<th>Params</th>
						<th className="w-full">Description</th>
					</tr>
				</thead>
				<tbody>
					{eventDefs.map((eventDef: DocsEventDef) => (
						<tr key={eventDef.name}>
							<td>
								<pre>{eventDef.name}</pre>
							</td>
							<td>
								{eventDef.params
									? eventDef.params.map((param: string) => (
											<code key={param} className="block">
												{param}
											</code>
										))
									: '-'}
							</td>
							<td dangerouslySetInnerHTML={{ __html: renderHtml(eventDef.details) }} />
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
