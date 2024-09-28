import { DocsHeader } from '@ds/docs/components/docs-header'
import { renderHtml } from '@ds/docs/utilities/docs'

interface Props {
	slotDefs: DocsSlotDef[]
}

export const SlotsTable = ({ slotDefs }: Props) => {
	const getNameFlag = (required?: boolean) => {
		return required ? (
			<span title="Required" className="cursor-default px-xs-3 font-weight-xl text-color-danger">
				*
			</span>
		) : (
			<span title="Optional" className="cursor-default px-xs-3 text-size-sm text-color-text-subtle">
				?
			</span>
		)
	}

	return (
		<>
			<DocsHeader>Slots</DocsHeader>

			<table className="docs">
				<thead>
					<tr>
						<th>Slot</th>
						<th className="w-full">Description</th>
					</tr>
				</thead>
				<tbody>
					{slotDefs.map((slotDef: DocsSlotDef) => (
						<tr key={slotDef.name}>
							<td>
								<pre className="inline">{slotDef.name}</pre>
								{getNameFlag(slotDef.required)}
							</td>
							<td dangerouslySetInnerHTML={{ __html: renderHtml(slotDef.details) }} />
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
