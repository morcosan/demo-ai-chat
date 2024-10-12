import { DocsHeader } from '@ds/docs/components/docs-header'
import { DocsPage } from '@ds/docs/components/docs-page'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding'
import '@ds/docs/setup'
import { DesktopSvg, LaptopSvg, PhoneSvg, TabletSvg, TOKENS__BREAKPOINT, WidescreenSvg } from '@ds/release'
import type { StoryObj } from '@storybook/react'
import { ReactNode } from 'react'

export const story: StoryObj = {}
story.storyName = 'Viewport'

export default {
	id: 'Design tokens / Viewport',
	title: 'Design tokens / Viewport',

	component: () => {
		interface Breakpoint {
			icon: ReactNode
			title: string
		}

		const breakpointMap: Record<string, Breakpoint> = {
			xs: { icon: <PhoneSvg className="w-xs-9" />, title: 'Phone' },
			sm: { icon: <TabletSvg className="w-sm-0" />, title: 'Tablet' },
			md: { icon: <TabletSvg className="w-sm-0 -rotate-90" />, title: 'Tablet' },
			lg: { icon: <LaptopSvg className="w-sm-4" />, title: 'Laptop' },
			xl: { icon: <DesktopSvg className="w-sm-4" />, title: 'Desktop' },
			xxl: { icon: <WidescreenSvg className="w-sm-5" />, title: 'Widescreen' },
		}

		return (
			<DocsPage title="Viewport tokens">
				<DocsHeader>Breakpoint tokens</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Token</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(TOKENS__BREAKPOINT).map(([name, token]) => (
							<tr key={name}>
								<td>
									<div className="flex items-center gap-xs-4 text-color-text-subtle">
										<div className="flex-center w-sm-5">{breakpointMap[name].icon}</div>

										<div className="flex flex-col whitespace-nowrap leading-1">
											<pre>{name}</pre>
											<div className="text-size-xs text-color-text-subtle">{breakpointMap[name].title}</div>
										</div>
									</div>
								</td>
								<td>
									<code>{token.$value}</code>
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$breakpoint['${name}']`}
										tsSize="w-lg-2"
										twVars={[`${name}:___`]}
										twSize="w-md-4"
										cssVar={token.$css}
										cssSize="w-lg-5"
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
