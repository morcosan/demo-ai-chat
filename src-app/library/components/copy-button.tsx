import { Button, ButtonVariant, CopySvg } from '@ds/release'
import { useState } from 'react'

interface Props extends ReactProps {
	variant: ButtonVariant
	tooltip: string
	text: string
}

export const CopyButton = ({ variant, tooltip, text, className }: Props) => {
	const [isCopied, setIsCopied] = useState(false)

	const onClick = () => {
		navigator.clipboard.writeText(text).then(() => setIsCopied(true))
		wait(1000).then(() => setIsCopied(false))
	}

	return (
		<Button
			variant={variant}
			size="xs"
			tooltip={tooltip}
			className={cx(className, isCopied && '!text-color-transparent')}
			onClick={onClick}
		>
			<CopySvg className="mr-xs-2 h-xs-4 w-xs-4" />
			<span className="leading-1">{t('core.action.copy')}</span>

			{Boolean(isCopied) && (
				<span className="absolute-center text-color-success-page-text">{t('core.label.copied')}</span>
			)}
		</Button>
	)
}
