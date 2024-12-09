import { Button, NewTabSvg, WarningSvg } from '@ds/release'
import { isChromeBrowser } from '@utils/release'

export const ChromeWarning = ({ id, className }: ReactProps) => {
	const isChrome = isChromeBrowser()

	const onClickChromeFlags = (event: ReactMouseEvent) => {
		// Browser security blocks navigation to chrome://flags
		event.preventDefault()
		navigator.clipboard.writeText('chrome://flags').then(() => window.open('', '_blank'))
	}

	return (
		<div
			id={id}
			className={cx(
				'flex rounded-md px-button-px-item py-xs-6',
				!isChrome && 'items-center',
				'bg-color-danger-card-bg text-size-sm text-color-danger-card-text',
				className
			)}
		>
			<WarningSvg className="mx-xs-2 w-xs-8 min-w-xs-8" />

			<div className="px-xs-5">
				{isChrome ? (
					<>
						{t('aiChat.warning.chromeGptInsideChrome')}

						<ul className="mt-xs-2 list-disc pl-xs-9">
							<li>Enables optimization guide on device</li>
							<li>Prompt API for Gemini Nano</li>
						</ul>
					</>
				) : (
					t('aiChat.warning.chromeGptOutsideChrome')
				)}

				{Boolean(isChrome) && (
					<Button
						linkHref="chrome://flags"
						linkType="external"
						variant="text-default"
						size="sm"
						className="ds-link -mb-xs-2 -ml-link-px-xs mt-xs-3"
						onClick={onClickChromeFlags}
					>
						<span className="flex items-center gap-xs-4">
							<span>{t('core.action.goToUrl', { url: 'chrome://flags' })}</span>
							<NewTabSvg className="w-xs-5" />
						</span>
					</Button>
				)}
			</div>
		</div>
	)
}
