import { useUserAccount } from '@app/biz-modules/user-settings/state'
import { AiChatSvg } from '@ds/release'
import { useI18n } from '@i18n/release'

export const LoadingScreen = ({ children }: ReactProps) => {
	const { isI18nLoaded } = useI18n()
	const { accountLoading } = useUserAccount()

	const isReady = isI18nLoaded && accountLoading !== 'full'

	const cssOverlay: CSS = {
		animation: isReady ? 'fadeOut 1s forwards' : 'unset',
		pointerEvents: isReady ? 'none' : 'unset',

		'@keyframes fadeOut': {
			from: { opacity: 1 },
			to: { opacity: 0 },
		},
	}

	return (
		<>
			{/* CONTENT */}
			<div className={cx(!isReady && 'hidden', 'h-full w-full')}>{children}</div>

			{/* OVERLAY */}
			<div className="fixed-overlay flex-center z-tooltip bg-color-bg-page" css={cssOverlay}>
				<AiChatSvg className="h-1/4 w-1/3 animate-pulse" aria-label="Loading..." />
			</div>
		</>
	)
}
