import { Button, CloseSvg, IconButton, PanelCloseSvg, ResizeSvg } from '@ds/release'
import { useAiChatLayout, useAiChatPreview } from '../state'
import { StickyToolbar } from './sticky-toolbar'

interface Props extends ReactProps {
	isChatView?: boolean
	isPreview?: boolean
}

export const PanelToolbar = (props: Props) => {
	const { isChatView, isPreview, children } = props
	const { panelWidth, setPanelWidth, setShowsPanel } = useAiChatLayout()
	const { closePreview } = useAiChatPreview()

	const PANEL_WIDTHS = [30, 35, 40, 45, 50, 55, 60, 65, 70]

	const onClickResize = () => {
		const nextWidth = PANEL_WIDTHS.find((width: number) => width > panelWidth) || PANEL_WIDTHS[0]

		setPanelWidth(nextWidth)
	}

	return (
		<StickyToolbar stretched permanent>
			<div className="flex h-button-h-md items-center gap-xs-2 pt-px text-size-sm">
				{children}

				<div className="ml-auto hidden items-center gap-xs-3 lg:flex">
					<Button
						tooltip={t('core.action.resizePanel')}
						variant="item-text-default"
						size="sm"
						className="px-xs-2"
						onClick={onClickResize}
					>
						<ResizeSvg className="mr-xs-0 h-xs-7" />

						<span className="mr-px text-size-xs leading-1" aria-live="polite">
							{isChatView ? 100 - panelWidth : panelWidth}%
						</span>
					</Button>

					{isPreview ? (
						<IconButton tooltip={t('aiChat.action.closePreview')} size="sm" onClick={closePreview}>
							<CloseSvg className="h-xs-7" />
						</IconButton>
					) : (
						<IconButton tooltip={t('core.action.hidePanel')} size="sm" onClick={() => setShowsPanel(false)}>
							<PanelCloseSvg className="h-xs-7" />
						</IconButton>
					)}
				</div>
			</div>
		</StickyToolbar>
	)
}
