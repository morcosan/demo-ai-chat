import { TextField, TextFieldProps, WarningSvg } from '@ds/release'

interface Props<T> extends ReactProps {
	field: Field<T>
	value: string
	error?: string
	disabled?: boolean
	onChange(value: string): void
}

export interface Field<T> {
	key: T
	label: string
	optional?: boolean
	props?: Partial<TextFieldProps>
}

export const DataField = <T,>({ field, value, error, disabled, onChange }: Props<T>) => {
	return (
		<div className="flex flex-wrap gap-x-xs-9">
			<div className="flex h-fit items-center pb-xs-2 pl-xs-0 sm:min-h-field-h-md sm:w-lg-0 sm:p-0">
				<label htmlFor={`field-${field.key}`} style={{ wordBreak: 'break-word' }}>
					{field.label}
					{field.optional ? (
						<span className="ml-xs-2 text-size-xs lowercase text-color-text-subtle sm:ml-0 sm:block">
							{t('core.label.optionalField')}
						</span>
					) : (
						<span className="ml-xs-3 text-color-danger" aria-label={t('core.label.requiredField')}>
							*
						</span>
					)}
				</label>
			</div>

			<div className="w-full sm:w-fit sm:flex-1">
				<TextField
					id={`field-${field.key}`}
					className="w-full"
					value={value}
					ariaDescription={error ? `${t('core.label.errors')}: ${error}` : ''}
					disabled={disabled}
					invalid={Boolean(error)}
					{...(field.props || {})}
					onChange={onChange}
				/>

				{Boolean(error) && (
					<div className="flex items-center text-size-sm leading-1 text-color-danger">
						<WarningSvg className="mr-xs-2 w-xs-6" />
						{error}
					</div>
				)}
			</div>
		</div>
	)
}
