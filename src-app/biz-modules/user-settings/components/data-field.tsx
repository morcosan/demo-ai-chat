import { FieldError, FieldLabel } from '@app/library/release'
import { TextField, TextFieldProps, useUiViewport } from '@ds/release'

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

export const DataField = <T,>(props: Props<T>) => {
	const { field, value, error, disabled, onChange } = props
	const { isViewportMinSM } = useUiViewport()

	return (
		<div className="flex flex-wrap gap-x-xs-9">
			<FieldLabel fieldId={`field-${field.key}`} optional={field.optional} multiline={isViewportMinSM}>
				{field.label}
			</FieldLabel>

			<div className="w-full sm:w-fit sm:flex-1">
				<TextField
					id={`field-${field.key}`}
					variant="primary"
					className="w-full"
					value={value}
					ariaDescription={error ? `${t('core.label.errors')}: ${error}` : ''}
					disabled={disabled}
					invalid={Boolean(error)}
					{...(field.props || {})}
					onChange={onChange}
				/>
				<FieldError error={error} />
			</div>
		</div>
	)
}
