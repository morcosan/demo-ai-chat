import { Button, WarningSvg } from '@ds/release'

interface Props extends ReactProps {
	companyName: string
}

export const ApiKeyWarning = ({ companyName, id, className }: Props) => {
	return (
		<div
			id={id}
			className={cx(
				'flex rounded-md px-button-px-item py-xs-6',
				'bg-color-danger-card-bg text-size-sm text-color-danger-card-text',
				className
			)}
		>
			<WarningSvg className="mx-xs-2 w-xs-8 min-w-xs-8" />

			<div className="px-xs-5">
				<div>{t('aiChat.warning.missingApiKey', { name: companyName })}</div>

				<Button
					linkHref="/settings/account"
					variant="text-default"
					size="sm"
					className="ds-link -mb-xs-2 -ml-link-px-xs mt-xs-2"
				>
					{t('core.action.goToUrl', {
						url: `${t('core.label.settings')} / ${t('userSettings.label.account')}`,
					})}
				</Button>
			</div>
		</div>
	)
}
