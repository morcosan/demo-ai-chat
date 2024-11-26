import { PlusSvg, SplitSvg } from '@ds/release'

interface Props extends ReactProps {
	count: number
	small?: boolean
}

export const SubchatIcon = ({ count, small, className }: Props) => {
	const isPlus = count < 0

	const iconClass = cx(
		'flex items-center',
		isPlus ? 'text-color-text-subtle' : 'text-color-secondary-page-text',
		className
	)

	return (
		<span className={iconClass}>
			<SplitSvg className={cx('mr-xs-0', small ? 'h-xs-7 w-xs-7' : 'h-xs-9 w-xs-9')} />

			{isPlus ? <PlusSvg className="w-xs-4" /> : <span className="text-size-xs font-weight-md">{count}</span>}
		</span>
	)
}
