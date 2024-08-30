import '@ds/docs/setup'
import { COLOR_TOKENS } from '@ds/release'
import type { StoryObj } from '@storybook/react'
import { DocsPage } from '../../components/docs-page'

export const story: StoryObj = {}
story.storyName = 'Color'

export default {
	id: 'Design tokens / Color',
	title: 'Design tokens / Color',

	component: () => {
		const primitiveTokens = COLOR_TOKENS.filter((token: DesignToken) => !token.ref)
		const semanticTokens = COLOR_TOKENS.filter((token: DesignToken) => token.ref)

		return (
			<DocsPage title="Color tokens">
				<h2 className="font-size-lg mb-xs-9">Semantic tokens</h2>
				<table className="docs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Value (light)</th>
							<th>Reference (light)</th>
							<th>Value (dark)</th>
							<th>Reference (dark)</th>
							<th>CSS variable</th>
						</tr>
					</thead>
					<tbody>
						{semanticTokens.map((token: DesignToken) => (
							<tr key={token.name}>
								<td>{token.name}</td>
								<td>
									<div className="flex items-center gap-xs-3">
										<div className="h-sm-1 w-sm-1" style={{ background: (token.value as TokenValue).light }} />
										{(token.value as TokenValue).light}
									</div>
								</td>
								<td>{(token.ref as TokenString).light}</td>
								<td>
									<div className="flex items-center gap-xs-3">
										<div className="h-sm-1 w-sm-1" style={{ background: (token.value as TokenValue).dark }} />
										{(token.value as TokenValue).dark}
									</div>
								</td>
								<td>{(token.ref as TokenString).dark}</td>
								<td>{token.css}</td>
							</tr>
						))}
					</tbody>
				</table>

				<h2 className="font-size-lg mb-xs-9 mt-sm-9">Primitive tokens</h2>
				<table className="docs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Value</th>
							<th>CSS variable</th>
						</tr>
					</thead>
					<tbody>
						{primitiveTokens.map((token: DesignToken) => (
							<tr key={token.name}>
								<td>{token.name}</td>
								<td>
									<div className="flex items-center gap-xs-3">
										<div className="h-sm-1 w-sm-1" style={{ background: token.css }} />
										{String(token.value)}
									</div>
								</td>
								<td>{token.css}</td>
							</tr>
						))}
					</tbody>
				</table>
			</DocsPage>
		)
	},
}
