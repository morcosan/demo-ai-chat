interface Props extends ReactProps {
	fieldId: string
	optional?: boolean
	multiline?: boolean
}

export const FieldLabel = ({ fieldId, optional, multiline, children }: Props) => {
	return (
		<div className={cx('flex h-fit items-center', multiline ? 'min-h-field-h-md w-lg-0 p-0' : 'pb-xs-2 pl-xs-0')}>
			<label
				htmlFor={fieldId}
				className={cx('flex', multiline ? 'flex-col' : 'items-center gap-xs-2')}
				style={{ wordBreak: 'break-word' }}
			>
				<span>
					{children}
					{!optional && (
						<span className="ml-xs-3 text-color-danger-page-text" aria-label={t('core.label.requiredField')}>
							*
						</span>
					)}
				</span>

				{Boolean(optional) && (
					<span className={cx('text-size-xs lowercase text-color-text-subtle')}>
						{t('core.label.optionalField')}
					</span>
				)}
			</label>
		</div>
	)
}
