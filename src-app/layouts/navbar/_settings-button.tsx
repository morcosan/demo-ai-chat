import { useUserAccount } from '@app/biz-modules/user-settings/state'
import { Button, ButtonHighlight } from '@ds/release'

interface Props {
	highlight?: ButtonHighlight
	onClick?(): void
}

export const SettingsButton = ({ highlight, onClick }: Props) => {
	const { account } = useUserAccount()

	return (
		<Button
			variant="item-text-default"
			size="lg"
			className="mt-xs-1 w-full text-left"
			highlight={highlight}
			onClick={onClick}
		>
			{Boolean(account.avatar) && (
				<img src={account.avatar} alt="" className="mr-button-px-item h-sm-2 min-w-sm-2 rounded-full" />
			)}

			<span className="line-clamp-1 flex flex-col leading-sm">
				<span className="mb-px line-clamp-1 w-full text-size-sm">{account.name}</span>

				<span className="line-clamp-1 w-full break-all pb-xs-0 text-size-xs text-color-text-subtle">
					{t('core.label.settings')}
				</span>
			</span>
		</Button>
	)
}
