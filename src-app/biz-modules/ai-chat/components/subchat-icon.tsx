import { PlusSvg, SplitSvg } from '@ds/release'

interface Props extends ReactProps {
	count: number
}

export const SubchatIcon = ({ count, className }: Props) => {
	const isPlus = count < 0

	const iconClass = cx(
		'flex items-center',
		isPlus ? 'text-color-text-placeholder' : 'text-color-secondary-text-default',
		className
	)

	return (
		<span className={iconClass}>
			<SplitSvg className="mr-xs-0 h-xs-9 min-w-xs-9" />

			{isPlus ? <PlusSvg className="w-xs-4" /> : <span className="text-size-xs font-weight-md">{count}</span>}
		</span>
	)
}
