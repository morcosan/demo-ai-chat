import { DocsHeader } from '@ds/docs/components/docs-header.tsx'
import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding.tsx'
import '@ds/docs/setup'
import { SPACING_TOKENS } from '@ds/release'
import type { StoryObj } from '@storybook/react'
import { Fragment } from 'react'

export const story: StoryObj = {}
story.storyName = 'Spacing'

export default {
	id: 'Design tokens / Spacing',
	title: 'Design tokens / Spacing',

	component: () => {
		const primitiveTokens = SPACING_TOKENS.filter((token: DesignToken) => !token.ref)
		const semanticTokens = SPACING_TOKENS.filter((token: DesignToken) => token.ref)

		return (
			<DocsPage title="Spacing tokens">
				<DocsHeader>Semantic tokens</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Reference</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{semanticTokens.map((token: DesignToken) => (
							<Fragment key={token.name}>
								<tr key={token.name} className="!border-b-0">
									<td>
										<pre>{token.name}</pre>
									</td>
									<td>
										<pre>{String(token.ref)}</pre>
									</td>
									<td>
										<code>{String(token.value)}px</code>
									</td>
									<td>
										<DocsTokenCoding
											token={token}
											twVars={[
												`w-${token.name.replace('spacing-', '')}`,
												`h-${token.name.replace('spacing-', '')}`,
												`m-${token.name.replace('spacing-', '')}`,
												`p-${token.name.replace('spacing-', '')}`,
											]}
											twSize="w-md-4"
											cssSize="w-lg-6"
										/>
									</td>
								</tr>

								<tr className="!border-t-0">
									<td colSpan={4} className="relative !py-0">
										<div
											className="absolute bottom-0 left-0 h-xs-1 bg-color-text-subtle"
											style={{ width: `var(--ds-${token.name})` }}
										/>
									</td>
								</tr>
							</Fragment>
						))}
					</tbody>
				</table>

				<DocsHeader>Primitive tokens</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Name</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{primitiveTokens.map((token: DesignToken) => (
							<Fragment key={token.name}>
								<tr key={token.name} className="!border-b-0">
									<td>
										<pre>{token.name}</pre>
									</td>
									<td>
										<code>{String(token.value)}px</code>
									</td>
									<td>
										<DocsTokenCoding
											token={token}
											twVars={[
												`w-${token.name.replace('spacing-', '')}`,
												`h-${token.name.replace('spacing-', '')}`,
												`m-${token.name.replace('spacing-', '')}`,
												`p-${token.name.replace('spacing-', '')}`,
											]}
											twSize="w-md-4"
											cssSize="w-lg-6"
										/>
									</td>
								</tr>

								<tr className="!border-t-0">
									<td colSpan={4} className="relative !py-0">
										<div
											className="absolute bottom-0 left-0 h-xs-1 bg-color-text-subtle"
											style={{ width: `var(--ds-${token.name})` }}
										/>
									</td>
								</tr>
							</Fragment>
						))}
					</tbody>
				</table>
			</DocsPage>
		)
	},
}
