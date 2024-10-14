import '@i18n/release'
import { ArgTypes } from '@storybook/csf'
import '@utils/release'
import './styles.css'

LOG('BUILD_MODE:', ENV__BUILD_MODE)
LOG('BUILD_NUMBER:', ENV__BUILD_NUMBER)
LOG('DS_VERSION:', ENV__DS_VERSION)
LOG('USE_CSS_VARS:', ENV__USE_CSS_VARS)

type Props<C> = DocsControlProps<C>
type Slots<C> = DocsControlSlots<C>
type Events<C> = DocsControlEvents<C>

export const createArgTypes = <C>(props: Props<C>, slots?: Slots<C>, events?: Events<C>) => {
	const argTypes: ArgTypes = {}

	if (slots) {
		slots.forEach((key: keyof JsxProps<C>) => {
			argTypes[key as string] = { control: 'text', table: { category: 'Slots' } }
		})
	}

	Object.entries(props).forEach(([key, value]: [string, any]) => {
		if (typeof value === 'object') {
			argTypes[key] = { control: 'inline-radio', options: value, table: { category: 'Props' } }
		} else {
			argTypes[key] = { control: value, table: { category: 'Props' } }
		}
	})

	argTypes.className = { control: 'text', table: { category: 'HTML' } }
	argTypes.style = { control: 'object', table: { category: 'HTML' } }

	if (events) {
		events.forEach((key: keyof JsxProps<C>) => {
			argTypes[key as string] = { table: { category: 'Events' } }
		})
	}

	return argTypes
}
