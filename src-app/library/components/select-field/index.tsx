import { CustomImpl } from './_custom-impl'
import { SelectFieldProps } from './_types'

export type { SelectFieldProps, SelectFilterFn, SelectOptionProps } from './_types'

export const SelectField = (props: SelectFieldProps) => {
	return <CustomImpl {...props} />
}
