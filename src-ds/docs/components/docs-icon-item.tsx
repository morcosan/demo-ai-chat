import { useDocsPlayground } from '@ds/docs/components/docs-playground-provider'
import { ComponentType, useState } from 'react'

export interface Icon {
	name: string
	elem: ComponentType<{ className?: string }>
	coding: string
}

interface Props {
	icon: Icon
}

export const DocIconItem = ({ icon }: Props) => {
	const { playgroundBgClass } = useDocsPlayground()
	const [copied, setCopied] = useState(false)

	const buttonClass = cx(
		'relative flex h-md-8 w-md-8 flex-col overflow-hidden',
		'rounded-sm border border-color-border-default text-color-text-default',
		'hover:shadow-md focus:shadow-md',
		'hover:scale-[1.05] focus:scale-[1.05]'
	)

	const copiedClass = cx(
		'flex-center absolute-overlay bg-color-success-bg',
		'text-size-sm font-weight-md text-color-success-text-default'
	)

	const onClick = (event: ReactMouseEvent) => {
		const button = event.target as HTMLButtonElement
		button.blur()

		navigator.clipboard.writeText(icon.coding)
		setCopied(true)
		wait(600).then(() => setCopied(false))
	}

	return (
		<button type="button" title={icon.coding} className={buttonClass} onClick={onClick}>
			<span className={cx('flex-center pointer-events-none w-full flex-1', playgroundBgClass)}>
				<icon.elem className="max-h-[40px] max-w-[40px]" />
			</span>

			<span className="pointer-events-none w-full border-t border-color-border-default py-xs-1 text-center">
				{icon.name}
			</span>

			{Boolean(copied) && <div className={copiedClass}>Copied</div>}
		</button>
	)
}
