import { useSettings } from '@app/biz-modules/user-settings/state'
import { Button, ButtonHighlight } from '@ds/release'

interface Props {
	highlight?: ButtonHighlight
	collapsed?: boolean
	onClick?(): void
}

export const SettingsButton = ({ highlight, collapsed, onClick }: Props) => {
	const { avatar, name } = useSettings()

	return (
		<Button
			variant="item-text-default"
			size="lg"
			className="mt-xs-4 w-full text-left"
			highlight={highlight}
			onClick={onClick}
		>
			<img src={avatar} alt="" className="h-sm-2 min-w-sm-2 rounded-full" />

			<span className={cx('ml-button-px-item flex-col items-start leading-1', collapsed ? 'hidden' : 'flex')}>
				<span className="line-clamp-1 py-xs-0">{name}</span>
				<span className="text-size-xs text-color-text-subtle">{t('core.settings')}</span>
			</span>
		</Button>
	)
}
