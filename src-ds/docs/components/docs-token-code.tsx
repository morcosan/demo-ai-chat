import { ReactNode, useState } from 'react'

interface Props {
	iconSvg: ReactNode
	value: string
	size?: string
	loading?: boolean
}

export const DocsTokenCode = ({ iconSvg, value, size, loading }: Props) => {
	const [copied, setCopied] = useState(false)

	const buttonClass = cx(
		'absolute-center origin-center overflow-hidden',
		'rounded-xs border border-color-border-default',
		'w-full min-w-full px-xs-0',
		'hover:w-fit focus:w-fit',
		'hover:w-fit focus:w-fit',
		'hover:px-xs-2 focus:px-xs-2',
		'hover:py-xs-1 focus:py-xs-1',
		'hover:z-popup focus:z-popup',
		'hover:shadow-md focus:shadow-md',
		'hover:bg-color-bg-default focus:bg-color-bg-default',
		'hover:scale-[1.1] focus:scale-[1.1]'
	)

	const copiedClass = cx(
		'flex-center absolute-overlay bg-color-success-bg',
		'text-size-sm font-weight-md text-color-success-text-default'
	)

	const onClick = (event: ReactMouseEvent) => {
		const button = event.target as HTMLButtonElement
		button.blur()

		navigator.clipboard.writeText(value)
		setCopied(true)
		wait(600).then(() => setCopied(false))
	}

	return loading ? (
		<div className={cx('flex-center h-sm-4 rounded-xs border border-color-border-subtle', size || 'w-md-8')}>
			...
		</div>
	) : (
		<div className={cx('relative h-sm-4', size || 'w-md-8')}>
			<button type="button" className={buttonClass} onClick={onClick}>
				<code className="pointer-events-none flex !w-full items-center gap-xs-2 !bg-color-bg-default">
					<span className="ml-px mt-px block h-xs-6">{iconSvg}</span>
					<span className="line-clamp-1">{value}</span>
				</code>

				{Boolean(copied) && <div className={copiedClass}>Copied</div>}
			</button>
		</div>
	)
}
