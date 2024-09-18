import { EventsTable } from '@ds/docs/components/partials/events-table'
import { PropsTable } from '@ds/docs/components/partials/props-table'
import { SlotsTable } from '@ds/docs/components/partials/slots-table'
import { Button, useUiLibrary, useUiTheme } from '@ds/release'
import { ChangeEvent, useEffect } from 'react'
import { renderHtml } from '../utilities/docs.ts'
import { toggleControls } from '../utilities/storybook'
import { DocsHeader } from './docs-header.tsx'
import { DocsPlayground } from './docs-playground.tsx'

type SelectEvent = ChangeEvent<HTMLSelectElement>

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
	const { isLight, isDark, changeTheme } = useUiTheme()
	const { uiLibrary, changeUiLibrary } = useUiLibrary()

	const getVariant = (enabled: boolean) => (enabled ? 'solid-primary' : 'text-default')

	useEffect(() => {
		// Requires a small delay
		wait(100).then(() => toggleControls(type === 'component'))
	}, [])

	return (
		<div className="h-screen w-screen overflow-x-hidden overflow-y-scroll px-sm-3 py-sm-2">
			<h1 className="mb-sm-6 text-size-xxl">{title}</h1>

			{/* UI library selector */}
			<select
				className="absolute right-lg-3 top-0 z-sticky h-button-h-sm bg-color-bg-default pl-xs-3 pr-xs-2 shadow-sm"
				value={uiLibrary}
				onChange={(event: SelectEvent) => changeUiLibrary(event.target?.value as UiLibrary)}
			>
				<option value={'custom' as UiLibrary}>Custom</option>
				<option value={'material' as UiLibrary}>Material UI</option>
				<option value={'antdesign' as UiLibrary}>Ant Design</option>
			</select>

			{/* UI theme selector */}
			<div className="absolute right-[12px] top-0 z-sticky flex whitespace-nowrap bg-color-bg-default text-size-sm">
				<Button variant={getVariant(isLight)} size="sm" className="shadow-sm" onClick={() => changeTheme('light')}>
					☀️ Light
				</Button>
				<Button variant={getVariant(isDark)} size="sm" className="shadow-sm" onClick={() => changeTheme('dark')}>
					🌙 Dark
				</Button>
			</div>

			<div className="pb-md-0">
				{type === 'component' ? (
					<>
						<DocsHeader>Playground</DocsHeader>
						<DocsPlayground>{children}</DocsPlayground>

						{Boolean(slots?.PROPS) && <PropsTable propDefs={slots?.PROPS || []} />}
						{Boolean(slots?.SLOTS) && <SlotsTable slotDefs={slots?.SLOTS || []} />}
						{Boolean(slots?.EVENTS) && <EventsTable eventDefs={slots?.EVENTS || []} />}
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
