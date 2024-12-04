import { CopyButton } from '@app/library/release'
import { Button, ChevronDownSvg, ChevronUpSvg, PreviewSvg } from '@ds/release'
import { useDefaults } from '@utils/release'
import { useState } from 'react'

interface Props extends ReactProps {
	html: string
	raw: string
	lang?: string
	noCollapse?: boolean
	noPreview?: boolean
	fullHeight?: boolean
	onPreviewCode?(code: string, lang: string): void
}

export const MarkdownCode = (props: Props) => {
	const { html, lang, raw, noCollapse, noPreview, fullHeight, onPreviewCode } = useDefaults(props, {
		lang: 'plaintext',
	})
	const [collapsed, setCollapsed] = useState(true)

	const regex = /```(?:[\w/]+)?\s([\s\S]*?)(?:```|``|`|$)/
	const code = raw.startsWith('```') ? raw.match(regex)?.[1].trim() || '' : raw

	const MIN_ROWS = 20
	const canCollapse = !noCollapse && code.split('\n').length > MIN_ROWS
	const canPreview = !noPreview

	return (
		<pre className={cx(fullHeight && 'h-full')}>
			<div className="ds-markdown-toolbar">
				{lang}

				<div className="ds-markdown-actions">
					<CopyButton variant="text-default" tooltip={t('aiChat.action.copyCode')} text={code} />

					{Boolean(canPreview) && (
						<Button
							tooltip={t('aiChat.action.previewCode')}
							variant="text-default"
							size="xs"
							onClick={() => onPreviewCode?.(code, lang!)}
						>
							<PreviewSvg className="mr-xs-2 h-xs-6 w-xs-6" />
							<span className="leading-1">{t('core.action.preview')}</span>
						</Button>
					)}
				</div>
			</div>

			<code
				dangerouslySetInnerHTML={{ __html: html }}
				role="region"
				tabIndex={0}
				aria-label={t('core.label.code') + `/${lang}`}
				className={cx(
					canCollapse && '!pb-sm-0',
					canCollapse && collapsed && 'max-h-xl-0 select-none !overflow-hidden',
					fullHeight && 'h-full'
				)}
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
