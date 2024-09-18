import { DocsHeader } from '@ds/docs/components/docs-header.tsx'
import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding.tsx'
import '@ds/docs/setup'
import { getTokenValue_SPACING, TOKENS__SPACING } from '@ds/release'
import type { StoryObj } from '@storybook/react'
import { Fragment } from 'react'

export const story: StoryObj = {}
story.storyName = 'Spacing'

export default {
	id: 'Design tokens / Spacing',
	title: 'Design tokens / Spacing',

	component: () => {
		type SpacingKey = keyof typeof TOKENS__SPACING

		const primitiveTokens = Object.entries<DesignToken<string>>(TOKENS__SPACING).filter(([, token]) => !token.$ref)
		const semanticTokens = Object.entries<DesignToken<string>>(TOKENS__SPACING).filter(([, token]) => token.$ref)

		return (
			<DocsPage title="Spacing tokens">
				<DocsHeader>Semantic tokens</DocsHeader>
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
							<Fragment key={name}>
								<tr key={name} className="!border-b-0">
									<td>
										<pre>{name}</pre>
									</td>
									<td>
										<pre>{token.$ref as string}</pre>
									</td>
									<td>
										<code>{getTokenValue_SPACING(token.$ref as SpacingKey)}</code>
									</td>
									<td>
										<DocsTokenCoding
											tsVar={`$spacing['${name}']`}
											tsSize="w-lg-2"
											twVars={[`w-${name}`, `h-${name}`, `m-${name}`, `p-${name}`]}
											twSize="w-md-4"
											cssVar={token.$css}
											cssSize="w-lg-6"
										/>
									</td>
								</tr>

								<tr className="!border-t-0">
									<td colSpan={4} className="relative !py-0">
										<div
											className="absolute bottom-0 left-0 h-xs-1 bg-color-text-subtle"
											style={{ width: `var(${token.$css})` }}
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
							<th>Token</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{primitiveTokens.map(([name, token]) => (
							<Fragment key={name}>
								<tr key={name} className="!border-b-0">
									<td>
										<pre>{name}</pre>
									</td>
									<td>
										<code>{token.$value}</code>
									</td>
									<td>
										<DocsTokenCoding
											tsVar={`$spacing['${name}']`}
											tsSize="w-lg-2"
											twVars={[`w-${name}`, `h-${name}`, `m-${name}`, `p-${name}`]}
											twSize="w-md-4"
											cssVar={token.$css}
											cssSize="w-lg-6"
										/>
									</td>
								</tr>

								<tr className="!border-t-0">
									<td colSpan={4} className="relative !py-0">
										<div
											className="absolute bottom-0 left-0 h-xs-1 bg-color-text-subtle"
											style={{ width: `var(${token.$css})` }}
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
