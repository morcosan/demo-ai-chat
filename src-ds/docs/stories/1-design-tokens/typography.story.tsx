import '@ds/docs/setup'
import { FONT_SIZE_TOKENS, FONT_WEIGHT_TOKENS, LINE_HEIGHT_TOKENS } from '@ds/release'
import type { StoryObj } from '@storybook/react'
import { DocsPage } from '../../components/docs-page'

export const story: StoryObj = {}
story.storyName = 'Typography'

export default {
	id: 'Design tokens / Typography',
	title: 'Design tokens / Typography',

	component: () => {
		return (
			<DocsPage title="Typography tokens">
				<table className="docs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Value (rem)</th>
							<th>Value (px)</th>
							<th>CSS variable</th>
							<th>Reference</th>
						</tr>
					</thead>
					<tbody>
						{FONT_SIZE_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td style={{ fontSize: token.css }}>{token.name}</td>
								<td>{token.value} rem</td>
								<td>{Number(token.value) * 16} px</td>
								<td>{token.css}</td>
								<td>{token.refName || '-'}</td>
							</tr>
						))}
					</tbody>
				</table>

				<table className="docs mt-md-0">
					<thead>
						<tr>
							<th>Name</th>
							<th>Value</th>
							<th>CSS variable</th>
							<th>Reference</th>
						</tr>
					</thead>
					<tbody>
						{FONT_WEIGHT_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td style={{ fontWeight: token.css }}>{token.name}</td>
								<td>{token.value}</td>
								<td>{token.css}</td>
								<td>{token.refName || '-'}</td>
							</tr>
						))}
					</tbody>
				</table>

				<table className="docs mt-md-0">
					<thead>
						<tr>
							<th>Name</th>
							<th>Value</th>
							<th>CSS variable</th>
							<th>Reference</th>
						</tr>
					</thead>
					<tbody>
						{LINE_HEIGHT_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td style={{ lineHeight: token.css }}>
									<div className="border border-grey-3">{token.name}</div>
								</td>
								<td>{token.value} em</td>
								<td>{token.css}</td>
								<td>{token.refName || '-'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</DocsPage>
		)
	},
}
