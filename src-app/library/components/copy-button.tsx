import { Button, ButtonVariant, CopySvg } from '@ds/release'
import { useState } from 'react'

interface Props extends ReactProps {
	variant: ButtonVariant
	text: string
}

export const CopyButton = ({ variant, text, className }: Props) => {
	const [isCopied, setIsCopied] = useState(false)

	const onClick = () => {
		navigator.clipboard.writeText(text).then(() => setIsCopied(true))
		wait(1000).then(() => setIsCopied(false))
	}

	return (
		<Button
			variant={variant}
			size="xs"
			className={cx(className, isCopied && '!text-color-transparent')}
			onClick={onClick}
		>
			<CopySvg className="mb-px mr-xs-2 h-xs-4 w-xs-4" />
			{t('core.action.copy')}

			{Boolean(isCopied) && (
				<span className="absolute-center text-color-success-page-text">{t('core.label.copied')}</span>
			)}
		</Button>
	)
}
