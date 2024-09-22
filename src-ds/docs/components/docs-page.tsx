import { EventsTable } from '@ds/docs/components/partials/events-table'
import { PropsTable } from '@ds/docs/components/partials/props-table'
import { SlotsTable } from '@ds/docs/components/partials/slots-table'
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
	useEffect(() => {
		// Requires a small delay
		wait(100).then(() => toggleControls(type === 'component'))
	}, [])

	return (
		<div className="h-screen w-screen overflow-x-hidden overflow-y-scroll px-sm-3 py-sm-2">
			<h1 className="mb-sm-6 text-size-xxl">{title}</h1>

			<div className="pb-md-0">
				{type === 'component' ? (
					<>
						<DocsHeader>Playground</DocsHeader>
						<DocsPlayground>{children}</DocsPlayground>

						{Boolean(slots?.SLOTS) && <SlotsTable slotDefs={slots?.SLOTS || []} />}
						{Boolean(slots?.PROPS) && <PropsTable propDefs={slots?.PROPS || []} />}
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
