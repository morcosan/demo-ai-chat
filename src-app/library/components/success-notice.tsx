import { CheckSvg } from '@ds/release'
import { useEffect, useRef } from 'react'

interface Props extends ReactProps {
	text: string
}

export const SuccessNotice = ({ text, className }: Props) => {
	const wrapperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		wait(0).then(() => wrapperRef.current?.scrollIntoView())
	}, [text])

	return (
		<div
			ref={wrapperRef}
			role="alert"
			className={cx('flex items-center px-xs-1 text-color-success-page-text', className)}
		>
			<CheckSvg className="mr-xs-4 w-xs-5" />
			{text}
		</div>
	)
}
