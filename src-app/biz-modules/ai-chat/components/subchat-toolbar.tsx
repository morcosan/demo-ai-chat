import { IconButton, PanelCloseSvg, useUiViewport } from '@ds/release'
import { StickyToolbar } from './sticky-toolbar'

interface Props extends ReactProps {
	onHidePanel(): void
}

export const SubchatToolbar = (props: Props) => {
	const { isViewportMaxLG } = useUiViewport()
	const { children, onHidePanel } = props

	return (
		<StickyToolbar stretched permanent>
			<div className="flex h-button-h-md items-center gap-xs-2 pt-px text-size-sm">
				{children}

				<div className={cx('ml-auto', isViewportMaxLG && 'hidden')}>
					<IconButton tooltip={t('core.action.hidePanel')} size="sm" onClick={onHidePanel}>
						<PanelCloseSvg className="h-xs-7" />
					</IconButton>
				</div>
			</div>
		</StickyToolbar>
	)
}
