import { WarningSvg } from '@ds/release'
import { isArray } from 'lodash'
import { useEffect, useRef } from 'react'

interface Props extends ReactProps {
	errors: string[] | object
}

export const ErrorSummary = ({ errors, className }: Props) => {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const listingRef = useRef<HTMLUListElement>(null)

	const validErrors = (isArray(errors) ? errors : Object.values(errors)).filter((error: string) => error)

	useEffect(() => {
		wait(0).then(() => {
			wrapperRef.current?.scrollIntoView()
			listingRef.current?.focus()
		})
	}, [errors])

	return (
		<div ref={wrapperRef} className={cx('py-a11y-padding', className)}>
			<ul
				ref={listingRef}
				tabIndex={-1}
				aria-label={t('core.label.errors')}
				className="rounded-lg bg-color-danger-bg px-button-px-item py-xs-3"
			>
				{validErrors.map((error: string, index: number) => (
					<li key={error + index} className="flex items-center text-color-danger-text-default">
						<WarningSvg className="mr-xs-3 w-xs-7" />
						{error}
					</li>
				))}
			</ul>
		</div>
	)
}
