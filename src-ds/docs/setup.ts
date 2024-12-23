import { HEADER_EVENTS, HEADER_PROPS, HEADER_SLOTS } from '@ds/docs/utilities/docs'
import { action } from '@storybook/addon-actions'
import { ArgTypes, InputType } from '@storybook/csf'
import '@utils/release'
import './styling/index.css'

LOG('BUILD_MODE:', ENV__BUILD_MODE)
LOG('BUILD_NUMBER:', ENV__BUILD_NUMBER)
LOG('DS_VERSION:', ENV__DS_VERSION)
LOG('USE_CSS_VARS:', ENV__USE_CSS_VARS)

type Props<C> = DocsControlProps<C>
type Keys<C> = DocsControlKeys<C>
type Defaults<C> = Partial<JsxProps<C>>

const createControl = (category: string, control?: DocsControlType, options?: any): InputType => ({
	control,
	options,
	table: { category },
})

export const createArgTypes = <C>(slots: Keys<C>, props: Props<C>, events: Keys<C>) => {
	const argTypes: ArgTypes = {}

	slots.forEach((key: any) => (argTypes[key] = createControl(HEADER_SLOTS, 'text')))

	Object.entries(props).forEach(([key, value]: [string, any]) => {
		argTypes[key] =
			typeof value === 'object'
				? createControl(HEADER_PROPS, 'inline-radio', value)
				: createControl(HEADER_PROPS, value)
	})

	events.forEach((key: any) => (argTypes[key] = createControl(HEADER_EVENTS)))

	return argTypes
}

export const createArgDefaults = <C>(props: Defaults<C>, events?: Keys<C>) => ({
	...props,
	...events?.reduce((acc, event) => ({ ...acc, [event]: action(String(event)) }), {}),
})
