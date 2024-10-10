import { useDocsPlayground } from '@ds/docs/components/docs-playground-provider'
import { useUiA11y } from '@ds/release'
import { useRef } from 'react'

export const DocsPlayground = ({ children, className }: ReactProps) => {
	const { forceA11yMode } = useUiA11y()
	const { playgroundBgClass } = useDocsPlayground()
	const input1Ref = useRef<HTMLInputElement>(null)
	const input2Ref = useRef<HTMLInputElement>(null)

	const bgClass = 'flex-center relative min-h-lg-9 flex-col rounded-md border border-color-border-default '
	const focusClass = cx(
		'absolute right-0 w-md-3 bg-color-bg-default py-xs-0',
		'text-center text-size-xs text-color-text-subtle'
	)

	const onFocusInput = (event: ReactFocusEvent) => {
		forceA11yMode('default')

		// Remove selection
		const input = event.target as HTMLInputElement
		input.selectionEnd = input.selectionStart
	}

	return (
		<div className={cx(bgClass, playgroundBgClass, className)}>
			<label htmlFor="kf-1" className="sr-only">
				Keyboard focus 1
			</label>
			<label htmlFor="kf-2" className="sr-only">
				Keyboard focus 2
			</label>

			<div tabIndex={0} className="opacity-0" onFocus={() => input2Ref.current?.focus()} />
			<input
				ref={input1Ref}
				id="kf-1"
				defaultValue="Keyboard focus"
				className={cx(focusClass, 'top-[-23px]')}
				onFocus={onFocusInput}
			/>
			{children}
			<input
				ref={input2Ref}
				id="kf-2"
				defaultValue="Keyboard focus"
				className={cx(focusClass, 'bottom-[-23px]')}
				onFocus={onFocusInput}
			/>
			<div tabIndex={0} className="opacity-0" onFocus={() => input1Ref.current?.focus()} />
		</div>
	)
}
