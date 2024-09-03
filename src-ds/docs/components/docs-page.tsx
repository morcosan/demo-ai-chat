import { Button, useColorThemeStore } from '@ds/release'
import { useEffect } from 'react'
import { renderHtml } from '../utilities/docs.ts'
import { toggleControls } from '../utilities/storybook'
import { DocsHeader } from './docs-header.tsx'
import { DocsPlayground } from './docs-playground.tsx'

interface ComponentSlots {
	PROPS?: DocsPropDef[]
	SLOTS?: DocsSlotDef[]
	EVENTS?: DocsEventDef[]
	TYPES?: string
}

interface Props extends ReactProps {
	title: string
	type?: 'component' | 'default'
	slots?: ComponentSlots
}

export const DocsPage = ({ title, type, slots, children }: Props) => {
	const { isLight, isDark, changeTheme } = useColorThemeStore()

	const getVariant = (enabled: boolean) => (enabled ? 'solid-primary' : 'text-default')

	const getNameFlag = (required?: boolean) => {
		return required ? (
			<span title="Required" className="cursor-default px-xs-3 font-weight-xl text-color-failure">
				*
			</span>
		) : (
			<span title="Optional" className="cursor-default px-xs-3 text-size-sm text-color-text-subtle">
				?
			</span>
		)
	}

	useEffect(() => {
		toggleControls(type === 'component')
	}, [])

	return (
		<div className="h-screen w-screen overflow-x-hidden overflow-y-scroll px-sm-3 py-sm-2">
			<h1 className="mb-sm-6 text-size-xxl">{title}</h1>

			{/* Color theme selector */}
			<div className="absolute right-[18px] top-0 z-sticky flex whitespace-nowrap bg-color-background text-size-sm shadow-sm">
				<Button variant={getVariant(isLight)} size="sm" square onClick={() => changeTheme('light')}>
					☀️ Light
				</Button>
				<Button variant={getVariant(isDark)} size="sm" square onClick={() => changeTheme('dark')}>
					🌙 Dark
				</Button>
			</div>

			<div className="pb-md-0">
				{type === 'component' ? (
					<>
						<DocsHeader>Playground</DocsHeader>
						<DocsPlayground>{children}</DocsPlayground>

						{Boolean(slots?.PROPS) && (
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
										{slots?.PROPS?.map((propDef: DocsPropDef) => (
											<tr key={propDef.name}>
												<td>
													<pre className="inline">{propDef.name}</pre>
													{getNameFlag(propDef.required)}
												</td>
												<td>
													<code>{propDef.type}</code>
												</td>
												<td>
													<code>{propDef.default}</code>
												</td>
												<td dangerouslySetInnerHTML={{ __html: renderHtml(propDef.details) }} />
											</tr>
										))}
									</tbody>
								</table>
							</>
						)}

						{Boolean(slots?.SLOTS) && (
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
										{slots?.SLOTS?.map((slotDef: DocsSlotDef) => (
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
						)}

						{Boolean(slots?.EVENTS) && (
							<>
								<DocsHeader>Events</DocsHeader>
								<table className="docs">
									<thead>
										<tr>
											<th>Event</th>
											<th>Params</th>
											<th className="w-full">Description</th>
										</tr>
									</thead>
									<tbody>
										{slots?.EVENTS?.map((eventDef: DocsEventDef) => (
											<tr key={eventDef.name}>
												<td>
													<pre>{eventDef.name}</pre>
												</td>
												<td>
													{eventDef.params
														? eventDef.params.map((param: string) => (
																<code key={param} className="block">
																	{param}
																</code>
															))
														: '-'}
												</td>
												<td dangerouslySetInnerHTML={{ __html: renderHtml(eventDef.details) }} />
											</tr>
										))}
									</tbody>
								</table>
							</>
						)}

						{Boolean(slots?.TYPES) && (
							<>
								<DocsHeader>Types</DocsHeader>
								<pre className="docs">
									<code
										dangerouslySetInnerHTML={{
											__html: renderHtml(String(slots?.TYPES).replace(/\n\s*/g, '\n')),
										}}
									/>
								</pre>
							</>
						)}
					</>
				) : (
					children
				)}
			</div>
		</div>
	)
}
