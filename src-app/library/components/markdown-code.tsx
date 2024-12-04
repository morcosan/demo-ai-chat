import { CopyButton } from '@app/library/release'
import { Button, ChevronDownSvg, ChevronUpSvg, PreviewSvg } from '@ds/release'
import { useDefaults } from '@utils/release'
import { useState } from 'react'

interface Props {
	html: string
	raw: string
	lang?: string
	onPreviewCode?(code: string, lang: string): void
}

export const MarkdownCode = (props: Props) => {
	const { html, lang, raw, onPreviewCode } = useDefaults(props, { lang: 'plaintext' })
	const [collapsed, setCollapsed] = useState(true)

	const regex = /```(?:[\w/]+)?\s([\s\S]*?)(?:```|``|`|$)/
	const code = raw.startsWith('```') ? raw.match(regex)?.[1].trim() || '' : raw

	const MIN_ROWS = 20
	const canCollapse = code.split('\n').length > MIN_ROWS

	return (
		<pre>
			<div className="ds-markdown-toolbar">
				{lang}

				<div className="ds-markdown-actions">
					<CopyButton variant="text-default" tooltip={t('aiChat.action.copyCode')} text={code} />

					<Button
						tooltip={t('aiChat.action.previewCode')}
						variant="text-default"
						size="xs"
						onClick={() => onPreviewCode?.(code, lang!)}
					>
						<PreviewSvg className="mr-xs-2 h-xs-6 w-xs-6" />
						<span className="leading-1">{t('core.action.preview')}</span>
					</Button>
				</div>
			</div>

			<code
				dangerouslySetInnerHTML={{ __html: html }}
				className={cx(canCollapse && '!pb-sm-0', collapsed && 'max-h-xl-0 select-none !overflow-hidden')}
			/>

			{Boolean(canCollapse) && (
				<div
					className={cx(
						'flex items-end justify-center rounded-sm',
						collapsed
							? 'absolute-overlay pb-scrollbar-h'
							: 'absolute bottom-scrollbar-h left-1/2 -translate-x-1/2',
						collapsed && 'bg-gradient-to-b from-color-transparent to-color-bg-card'
					)}
				>
					<Button variant="text-default" size="xs" onClick={() => setCollapsed((value) => !value)}>
						{collapsed ? (
							<>
								<ChevronDownSvg className="mr-xs-2 h-xs-4 w-xs-4" />
								<span className="leading-1">{t('core.action.expand')}</span>
							</>
						) : (
							<>
								<ChevronUpSvg className="mr-xs-2 h-xs-4 w-xs-4" />
								<span className="leading-1">{t('core.action.collapse')}</span>
							</>
						)}
					</Button>
				</div>
			)}
		</pre>
	)
}
