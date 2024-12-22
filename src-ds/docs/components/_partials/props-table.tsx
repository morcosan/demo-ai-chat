import { DocsHeader } from '@ds/docs/components/docs-header'
import { getPropIndicator, renderHtml } from '@ds/docs/utilities/docs'

interface Props {
	header: string
	propDefs: DocsPropDef[]
}

export const PropsTable = ({ header, propDefs }: Props) => {
	return (
		<>
			<DocsHeader>{header}</DocsHeader>

			<table className="docs">
				<thead>
					<tr>
						<th>Property</th>
						<th>Type</th>
						<th>Default</th>
						<th className="w-full">Description</th>
					</tr>
				</thead>
				<tbody>
					{propDefs.map((propDef: DocsPropDef) => (
						<tr key={propDef.name}>
							<td>
								<pre className="inline">{propDef.name}</pre>
								{getPropIndicator(propDef.required)}
							</td>
							<td>
								<code>{propDef.type}</code>
							</td>
							<td>
								<code>{propDef.default || 'undefined'}</code>
							</td>
							<td dangerouslySetInnerHTML={{ __html: renderHtml(propDef.details) }} />
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
