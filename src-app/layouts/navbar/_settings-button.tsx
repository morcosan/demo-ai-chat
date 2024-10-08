import { useSettings } from '@app/biz-modules/user-settings/state'
import { Button, ButtonHighlight } from '@ds/release'
import { randomFullName } from '@utils/release'
import { useMemo } from 'react'

interface Props {
	highlight?: ButtonHighlight
	onClick?(): void
}

export const SettingsButton = ({ highlight, onClick }: Props) => {
	const { avatar } = useSettings()

	const name = useMemo(() => randomFullName(), [])

	return (
		<Button
			variant="item-text-default"
			size="lg"
			className="mt-xs-4 w-full"
			highlight={highlight}
			onClick={onClick}
		>
			<img src={avatar} alt="" className="h-sm-2 w-sm-2 rounded-full" />
			<span className="ml-button-px-item flex flex-col items-start leading-1">
				<span className="py-xs-0">{name}</span>
				<span className="text-size-xs text-color-text-subtle">Settings</span>
			</span>
		</Button>
	)
}
