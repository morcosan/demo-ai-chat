import { useDocsPlayground } from '@ds/docs/components/docs-playground-provider'

export const DocsPlaygroundBase = ({ children, className }: ReactProps) => {
	const { playgroundBgClass } = useDocsPlayground()

	return (
		<div className={cx('rounded-md border border-color-border-default', playgroundBgClass, className)}>
			{children}
		</div>
	)
}
