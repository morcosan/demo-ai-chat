import { DocsHeader } from '@ds/docs/components/docs-header'
import { DocsPage } from '@ds/docs/components/docs-page'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding'
import { DocsTokenThemeGrid } from '@ds/docs/components/docs-token-theme-grid'
import '@ds/docs/setup'
import { getTokenValue_Z_INDEX, TOKENS__SHADOW, TOKENS__Z_INDEX } from '@ds/release'
import type { StoryObj } from '@storybook/react'

export const story: StoryObj = {}
story.storyName = 'Elevation'

export default {
	id: 'Design tokens / Elevation',
	title: 'Design tokens / Elevation',

	component: () => {
		type ZIndexKey = keyof typeof TOKENS__Z_INDEX

		const primitiveTokens = Object.entries<DesignToken<number>>(TOKENS__Z_INDEX).filter(([, token]) => !token.$ref)
		const semanticTokens = Object.entries<DesignToken<number>>(TOKENS__Z_INDEX).filter(([, token]) => token.$ref)

		return (
			<DocsPage title="Elevation tokens">
				<DocsHeader>Shadow tokens</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Token</th>
							<th>Value</th>
							<th className="w-full">Preview</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(TOKENS__SHADOW).map(([name, token]) => (
							<tr key={name}>
								<td>
									<pre>{name}</pre>
								</td>
								<td>
									<DocsTokenThemeGrid
										lightSlot={<code>{token.$value.light}</code>}
										darkSlot={<code>{token.$value.dark}</code>}
									/>
								</td>
								<td>
									<div className="flex items-center gap-xs-7">
										<div className="h-sm-8 w-sm-8" style={{ boxShadow: String(token.$value.light) }} />
										<div className="h-sm-8 w-sm-8" style={{ boxShadow: String(token.$value.dark) }} />
									</div>
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$shadow['${name}']`}
										tsSize="w-lg-1"
										twVars={[`shadow-${name}`]}
										cssVar={token.$css}
										cssSize="w-lg-2"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<DocsHeader>Z-Index semantic tokens</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Token</th>
							<th>Reference</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{semanticTokens.map(([name, token]) => (
							<tr key={name}>
								<td>
									<pre>{name}</pre>
								</td>
								<td>
									<pre>{token.$ref as string}</pre>
								</td>
								<td>
									<code>{getTokenValue_Z_INDEX(token.$ref as ZIndexKey)}</code>
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$zIndex['${name}']`}
										tsSize="w-lg-1"
										twVars={[`z-${name}`]}
										cssVar={token.$css}
										cssSize="w-lg-2"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<DocsHeader>Z-Index primitive tokens</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Token</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{primitiveTokens.map(([name, token]) => (
							<tr key={name}>
								<td>
									<pre>{name}</pre>
								</td>
								<td>
									<code>{token.$value}</code>
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$zIndex['${name}']`}
										tsSize="w-lg-1"
										twVars={[`z-${name.replace('z-index-', '')}`]}
										twSize="w-md-5"
										cssVar={token.$css}
										cssSize="w-lg-3"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</DocsPage>
		)
	},
}
