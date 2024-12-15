import { DocsPage } from '@ds/docs/components/docs-page'
import { createArgTypes } from '@ds/docs/setup'
import {
	IconButton,
	IconButtonSize,
	IconButtonVariant,
	SendSvg,
	TextField,
	TextFieldProps,
	TextFieldSize,
} from '@ds/release'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { useMemo } from 'react'

export const story: StoryObj<typeof TextField> = {
	args: {
		// Slots
		slotLeft: '',
		slotRight: '',
		// Props
		id: 'example-id',
		variant: 'default',
		size: 'md',
		placeholder: 'Type some text',
		ariaLabel: 'Example label',
		ariaDescription: 'Example description',
		maxLength: 0,
		multiline: false,
		minRows: 0,
		maxRows: 0,
		readonly: false,
		disabled: false,
		invalid: false,
		// Html
		className: '',
		style: {},
		// Events
		onChange: action('onChange'),
		onSubmit: action('onSubmit'),
		onFocus: action('onFocus'),
		onBlur: action('onBlur'),
	},
}
story.storyName = 'Text Field'

const meta: Meta<typeof TextField> = {
	id: 'Components / Text Field',
	title: 'Components / Text Field',

	argTypes: createArgTypes<typeof TextField>(
		{
			id: 'text',
			variant: ['default', 'primary', 'secondary'],
			size: ['sm', 'md', 'lg', 'xl'],
			placeholder: 'text',
			ariaLabel: 'text',
			ariaDescription: 'text',
			maxLength: 'number',
			multiline: 'boolean',
			minRows: 'number',
			maxRows: 'number',
			readonly: 'boolean',
			disabled: 'boolean',
			invalid: 'boolean',
		},
		['slotLeft', 'slotRight'],
		['onChange', 'onSubmit', 'onFocus', 'onBlur']
	),

	component: function Story(props: TextFieldProps) {
		const SLOTS: DocsSlotDef[] = [
			{
				name: 'slotLeft',
				details: `Content to be rendered inside the field, on the left`,
			},
			{
				name: 'slotRight',
				details: `Content to be rendered inside the field, on the right`,
			},
		]
		const PROPS: DocsPropDef[] = [
			{
				name: 'id',
				type: 'string',
				details: `Unique HTML id attribute for the ^<input>^ or ^<textarea>^ element`,
				required: true,
			},
			{
				name: 'variant',
				type: 'TextFieldVariant',
				default: `'default'`,
				details: `Property that determines active border color when the field is focused`,
			},
			{
				name: 'size',
				type: 'TextFieldSize',
				default: `'md'`,
				details: `Property that determines the height and padding for the field`,
			},
			{
				name: 'value',
				type: 'string',
				details: `Text value displayed inside the field`,
			},
			{
				name: 'placeholder',
				type: 'string',
				details: `Text displayed as placeholder when ^value^ prop is empty`,
			},
			{
				name: 'ariaLabel',
				type: 'string',
				details: `Text used by screen reader as label for the field`,
			},
			{
				name: 'ariaDescription',
				type: 'string',
				details: `Text used by screen reader as description for the field`,
			},
			{
				name: 'maxLength',
				type: 'number',
				details: `Maximum number of characters allowed for ^value^ prop`,
			},
			{
				name: 'multiline',
				type: 'boolean',
				default: 'false',
				details: `
					Flag for allowing multiple lines of text separated by ^\\n^ character
					The field will auto-expand based on ^minRows^ and ^maxRows^ props
					It uses ^<textarea>^ HTML element instead of ^<input>^ element
				`,
			},
			{
				name: 'minRows',
				type: 'number',
				details: `Minimum number of rows displayed when ^value^ prop is empty`,
			},
			{
				name: 'maxRows',
				type: 'number',
				details: `
					Maximum number of rows displayed before enforcing vertical scrolling
					If ^maxRows^ is smaller than ^minRows^, then ^minRows^ is used instead
				`,
			},
			{
				name: 'readonly',
				type: 'boolean',
				default: 'false',
				details: `
					Flag for marking the field as read-only and disable editing
					The field is still accessible via keyboard navigation
				`,
			},
			{
				name: 'disabled',
				type: 'boolean',
				default: 'false',
				details: `Flag for completely disable the field and its interaction`,
			},
			{
				name: 'invalid',
				type: 'boolean',
				details: `Flag for displaying the error state`,
			},
		]

		const EVENTS: DocsEventDef[] = [
			{
				name: 'onChange',
				details: `Event emitted when the field is edited and ^value^ prop must change`,
				params: [`value: string`, `event: ReactChangeEvent`],
			},
			{
				name: 'onSubmit',
				details: `Event emitted when ^Enter^ key is pressed, before ^onChange^ is emitted`,
				params: [`event: ReactKeyboardEvent`],
			},
			{
				name: 'onFocus',
				details: `Event emitted when the field receives keyboard focus`,
				params: [`event: ReactFocusEvent`],
			},
			{
				name: 'onBlur',
				details: `Event emitted when the field loses keyboard focus`,
				params: [`event: ReactFocusEvent`],
			},
		]

		const METHODS: DocsMethodDef[] = [
			{
				name: 'focus',
				details: `Method that triggers ^focus^ on the ^<input>^ or ^<textarea>^ element`,
			},
			{
				name: 'blur',
				details: `Method that triggers ^blur^ on the ^<input>^ or ^<textarea>^ element`,
			},
		]

		const TYPES = `
			type TextFieldVariant = 'default' | 'primary' | 'secondary'
			type TextFieldSize = 'sm' | 'md' | 'lg' | 'xl'
			
			interface TextFieldRef {
				focus(): void
				blur(): void
			}
		`

		const getSlot = (size: IconButtonSize, variant?: IconButtonVariant) => (
			<IconButton tooltip="Tooltip" size={size} variant={variant}>
				<SendSvg className="h-xs-5" />
			</IconButton>
		)

		const fieldSizes: TextFieldSize[] = ['sm', 'md', 'lg', 'xl']
		const buttonSizes: IconButtonSize[] = ['xs', 'sm', 'sm', 'md']
		const multilines = [false, true]

		const EXAMPLES = useMemo(
			() => (
				<label className="flex flex-wrap items-center gap-xs-7 p-sm-0">
					<span className="sr-only">Label</span>

					{fieldSizes.map((size, index) => (
						<div key={size} className="mb-xs-7 flex flex-wrap gap-xs-7">
							{multilines.map((multiline) => (
								<div key={multiline ? 1 : 0} className="flex w-full flex-wrap items-center gap-xs-7">
									<TextField
										id={`${size}1`}
										size={size}
										placeholder={`${multiline ? 'Multiline' : 'Default'} - ${size}`}
										multiline={multiline}
										className="flex-1"
									/>
									<TextField
										id={`${size}2`}
										size={size}
										placeholder={`${multiline ? 'Multiline' : 'Default'} - ${size}`}
										slotLeft={getSlot(buttonSizes[index])}
										multiline={multiline}
										className="flex-1"
									/>
									<TextField
										id={`${size}3`}
										size={size}
										placeholder={`${multiline ? 'Multiline' : 'Default'} - ${size}`}
										slotRight={
											<>
												{getSlot(buttonSizes[index])}
												{getSlot(buttonSizes[index])}
											</>
										}
										multiline={multiline}
										className="flex-1"
									/>
									<TextField
										id={`${size}4`}
										size={size}
										placeholder={`${multiline ? 'Multiline' : 'Default'} - ${size}`}
										slotRight={getSlot(buttonSizes[index], 'solid-primary')}
										multiline={multiline}
										className="flex-1"
									/>
								</div>
							))}
						</div>
					))}

					<div className="flex w-full flex-wrap items-center gap-xs-7">
						<TextField id="default" placeholder="Default" className="flex-1" />
						<TextField id="readonly" value="Readonly value" className="flex-1" readonly />
						<TextField id="readonly" placeholder="Readonly placeholder" className="flex-1" readonly />
						<TextField id="disabled" value="Disabled value" className="flex-1" disabled />
						<TextField id="disabled" placeholder="Disabled placeholder" className="flex-1" disabled />
					</div>

					<div className="flex w-full flex-wrap items-center gap-xs-7">
						<TextField id="default-multiline" placeholder={'Default\nMultiline'} className="flex-1" multiline />
						<TextField
							id="readonly-multiline"
							value={'Readonly value\nMultiline'}
							className="flex-1"
							multiline
							readonly
						/>
						<TextField
							id="readonly-multiline"
							placeholder={'Readonly placeholder\nMultiline'}
							className="flex-1"
							multiline
							readonly
						/>
						<TextField
							id="disabled-multiline"
							value={'Disabled value\nMultiline'}
							className="flex-1"
							multiline
							disabled
						/>
						<TextField
							id="disabled-multiline"
							placeholder={'Disabled placeholder\nMultiline'}
							className="flex-1"
							multiline
							disabled
						/>
					</div>

					<div className="flex w-full flex-wrap items-center gap-xs-7">
						<TextField
							id="variant-default"
							variant="default"
							placeholder="Variant - default"
							slotRight={getSlot('sm', 'text-default')}
							className="flex-1"
						/>
						<TextField
							id="variant-primary"
							variant="primary"
							placeholder="Variant - primary"
							slotRight={getSlot('sm', 'solid-primary')}
							className="flex-1"
						/>
						<TextField
							id="variant-secondary"
							variant="secondary"
							placeholder="Variant - secondary"
							slotRight={getSlot('sm', 'solid-secondary')}
							className="flex-1"
						/>
					</div>
				</label>
			),
			[]
		)

		return (
			<DocsPage title="Text Field" type="component" slots={{ SLOTS, PROPS, EVENTS, METHODS, TYPES, EXAMPLES }}>
				<TextField {...props} />
			</DocsPage>
		)
	},
}

export default meta
