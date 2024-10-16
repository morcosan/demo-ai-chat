import { AiChatSvg } from '@ds/release'
import { useI18n } from '@i18n/release'

export const LoadingScreen = ({ children }: ReactProps) => {
	const { isLoaded } = useI18n()

	const cssOverlay: CSS = {
		animation: isLoaded ? 'fadeOut 1s forwards' : 'unset',
		pointerEvents: isLoaded ? 'none' : 'unset',

		'@keyframes fadeOut': {
			from: { opacity: 1 },
			to: { opacity: 0 },
		},
	}

	return (
		<>
			{/* CONTENT */}
			<div className={cx(!isLoaded && 'hidden', 'h-full w-full')}>{children}</div>

			{/* OVERLAY */}
			<div className="fixed-overlay flex-center z-tooltip bg-color-bg-default" css={cssOverlay}>
				<AiChatSvg className="h-1/4 w-1/3 animate-pulse" aria-label="Loading..." />
			</div>
		</>
	)
}
