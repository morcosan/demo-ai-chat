import { DocsHeader } from '@ds/docs/components/docs-header'
import { renderHtml } from '@ds/docs/utilities/docs'

interface Props {
	propDefs: DocsPropDef[]
}

export const PropsTable = ({ propDefs }: Props) => {
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
			<DocsHeader>Props</DocsHeader>

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
								{getNameFlag(propDef.required)}
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
