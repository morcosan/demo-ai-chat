import { CloseSvg, IconButton } from '@ds/release'
import { StickyToolbar } from './sticky-toolbar'

export const SubchatToolbar = ({ children }: ReactProps) => {
	return (
		<StickyToolbar stretched permanent>
			<div className="flex h-button-h-md items-center gap-xs-2 pt-px text-size-sm">
				{children}

				<div className="ml-auto">
					<IconButton tooltip={t('core.action.hidePanel')} size="sm">
						<CloseSvg className="h-xs-5" />
					</IconButton>
				</div>
			</div>
		</StickyToolbar>
	)
}
