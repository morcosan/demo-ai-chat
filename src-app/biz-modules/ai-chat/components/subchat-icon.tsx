import { PlusSvg, SplitSvg } from '@ds/release'

interface Props extends ReactProps {
	count: number
}

export const SubchatIcon = ({ count, className = '' }: Props) => {
	const isPlus = count < 0

	const subtleClass = 'text-color-text-placeholder fill-color-text-placeholder stroke-color-text-placeholder'
	const colorClass = [
		'text-color-secondary-text-default',
		'fill-color-secondary-text-default',
		'stroke-color-secondary-text-default',
	].join(' ')

	return (
		<span className={`flex items-center ${isPlus ? subtleClass : colorClass} ${className}`}>
			<SplitSvg className="mr-xs-0 h-xs-9 min-w-xs-9" />

			{isPlus ? <PlusSvg className="w-xs-4" /> : <span className="text-size-xs font-weight-md">{count}</span>}
		</span>
	)
}
