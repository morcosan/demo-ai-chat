import { FieldError, FieldLabel } from '@app/library/release'
import { TextField, TextFieldProps } from '@ds/release'

export interface Field {
	id: string
	label: string
	optional?: boolean
	props?: Partial<TextFieldProps>
}

interface Props extends ReactProps {
	field: Field
	value: string
	error?: string
	disabled?: boolean
	onChange(value: string): void
}

export const AgentEditField = (props: Props) => {
	const { field, value, error, disabled, className, onChange } = props

	return (
		<div className={cx('flex flex-col', className)}>
			<FieldLabel fieldId={field.id} optional={field.optional}>
				{field.label}
			</FieldLabel>
			<TextField
				id={field.id}
				variant="primary"
				value={value}
				ariaDescription={error ? `${t('core.label.errors')}: ${error}` : ''}
				disabled={disabled}
				invalid={Boolean(error)}
				{...(field.props || {})}
				onChange={onChange}
			/>
			<FieldError error={error} />
		</div>
	)
}
