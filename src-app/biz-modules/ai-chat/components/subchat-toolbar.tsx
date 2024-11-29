import { Button, IconButton, PanelCloseSvg, ResizeSvg } from '@ds/release'
import { useAiChatLayout } from '../state'
import { StickyToolbar } from './sticky-toolbar'

interface Props extends ReactProps {
	onHidePanel(): void
}

export const SubchatToolbar = (props: Props) => {
	const { children, onHidePanel } = props
	const { panelWidth, setPanelWidth } = useAiChatLayout()

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
							{panelWidth}%
						</span>
					</Button>

					<IconButton tooltip={t('core.action.hidePanel')} size="sm" onClick={onHidePanel}>
						<PanelCloseSvg className="h-xs-7" />
					</IconButton>
				</div>
			</div>
		</StickyToolbar>
	)
}
