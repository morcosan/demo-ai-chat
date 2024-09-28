import { DocsHeader } from '@ds/docs/components/docs-header'
import { renderHtml } from '@ds/docs/utilities/docs'

interface Props {
	methodDefs: DocsMethodDef[]
}

export const MethodsTable = ({ methodDefs }: Props) => {
	return (
		<>
			<DocsHeader>Methods</DocsHeader>

			<table className="docs">
				<thead>
					<tr>
						<th>Event</th>
						<th>Params</th>
						<th className="w-full">Description</th>
					</tr>
				</thead>
				<tbody>
					{methodDefs.map((methodDef: DocsMethodDef) => (
						<tr key={methodDef.name}>
							<td>
								<pre>{methodDef.name}</pre>
							</td>
							<td>
								{methodDef.params
									? methodDef.params.map((param: string) => (
											<code key={param} className="block">
												{param}
											</code>
										))
									: '-'}
							</td>
							<td dangerouslySetInnerHTML={{ __html: renderHtml(methodDef.details) }} />
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
