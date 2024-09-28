import { EventsTable } from '@ds/docs/components/_partials/events-table'
import { MethodsTable } from '@ds/docs/components/_partials/methods-table'
import { PropsTable } from '@ds/docs/components/_partials/props-table'
import { SlotsTable } from '@ds/docs/components/_partials/slots-table'
import { useDocsPlayground } from '@ds/docs/components/docs-playground-provider'
import { IconButton, MaximizeSvg, MinimizeSvg } from '@ds/release'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { renderHtml } from '../utilities/docs.ts'
import { toggleControls } from '../utilities/storybook'
import { DocsHeader } from './docs-header.tsx'
import { DocsPlayground } from './docs-playground.tsx'

interface ComponentSlots {
	PROPS?: DocsPropDef[]
	SLOTS?: DocsSlotDef[]
	EVENTS?: DocsEventDef[]
	METHODS?: DocsMethodDef[]
	TYPES?: string
	EXAMPLES?: ReactNode
}

interface Props extends ReactProps {
	title: string | ReactNode
	type?: 'component' | 'default'
	slots?: ComponentSlots
}

export const DocsPage = ({ title, type, slots, children }: Props) => {
	const { playgroundBgClass } = useDocsPlayground()
	const [playExpanded, setPlayExpanded] = useState(false)
	const playWrapperRef = useRef<HTMLDivElement>(null)

	const playTooltip = playExpanded ? 'Collapse playground' : 'Expand playground'

	const onClickTogglePlay = useCallback(() => {
		setPlayExpanded(!playExpanded)

		if (playExpanded) {
			window.scrollTo({ top: 0 })
		} else {
			playWrapperRef.current?.scrollIntoView()
		}
	}, [playExpanded])

	useEffect(() => {
		// Requires a small delay
		wait(100).then(() => toggleControls(type === 'component'))
	}, [])

	return (
		<div className="px-sm-3 py-sm-2">
			<h1 className={`${type === 'component' ? 'mb-md-2' : 'mb-sm-6'} text-size-xxl`}>{title}</h1>

			<div className="pb-md-0">
				{type === 'component' ? (
					<>
						<div ref={playWrapperRef} className={`flex flex-col ${playExpanded ? 'mt-0 h-screen pb-sm-1' : ''}`}>
							<DocsHeader className={playExpanded ? '!mb-xs-4 !mt-0' : '!mt-0'}>
								<span className="mr-xs-5">Playground</span>
								<IconButton size="sm" tooltip={playTooltip} onClick={onClickTogglePlay}>
									{playExpanded ? <MinimizeSvg className="h-xs-6" /> : <MaximizeSvg className="h-xs-6" />}
								</IconButton>
							</DocsHeader>
							<DocsPlayground className="flex-1">{children}</DocsPlayground>
						</div>

						{Boolean(slots?.EXAMPLES) && (
							<>
								<DocsHeader>Examples</DocsHeader>
								<div className={`rounded-md border border-color-border-default ${playgroundBgClass}`}>
									{slots?.EXAMPLES}
								</div>
							</>
						)}
						{Boolean(slots?.SLOTS) && <SlotsTable slotDefs={slots?.SLOTS || []} />}
						{Boolean(slots?.PROPS) && <PropsTable propDefs={slots?.PROPS || []} />}
						{Boolean(slots?.EVENTS) && <EventsTable eventDefs={slots?.EVENTS || []} />}
						{Boolean(slots?.METHODS) && <MethodsTable methodDefs={slots?.METHODS || []} />}
						{Boolean(slots?.TYPES) && (
							<>
								<DocsHeader>Types</DocsHeader>
								<pre className="docs">
									<code
										dangerouslySetInnerHTML={{
											__html: renderHtml(
												String(slots?.TYPES)
													.split('\n')
													.map((line) => line.trimStart())
													.join('\n')
													.replace(/\{([^}]+)}/s, (_, text) => `{${text.replace(/^/gm, '\t')}}`)
													.replace(/\{\t/g, '{')
													.replace(/\t}/g, '}')
													.replace(/\n\|/g, '\n\t|')
											),
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
