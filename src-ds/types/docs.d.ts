declare interface DocsPropDef {
	name: string
	type: string
	default: string
	details: string
	required?: boolean
}

declare interface DocsSlotDef {
	name: string
	details: string
	required?: boolean
}

declare interface DocsEventDef {
	name: string
	details: string
	params?: string[]
}

declare type DocsControlProps<C> = Partial<Record<keyof JsxProps<C>, DocsControlType>>
declare type DocsControlSlots<C> = Array<keyof JsxProps<C>>
declare type DocsControlEvents<C> = Array<keyof JsxProps<C>>
declare type DocsControlType =
	| 'object'
	| 'boolean'
	| 'check'
	| 'inline-check'
	| 'radio'
	| 'inline-radio'
	| 'select'
	| 'multi-select'
	| 'number'
	| 'range'
	| 'file'
	| 'color'
	| 'date'
	| 'text'
	| Array<string | number>

declare interface StoryGlobals {
	colorTheme?: ColorTheme
	uiLibrary?: UiLibrary
	measureEnabled?: boolean
	outline?: boolean
}
declare interface StoryGlobalTypes {
	colorTheme?: StoryGlobalConfig<ColorTheme>
	uiLibrary?: StoryGlobalConfig<UiLibrary>
}
declare interface StoryGlobalConfig<T> {
	description: string
	toolbar: {
		items: Array<{
			value: T
			title: string
			icon: string
		}>
		dynamicTitle: true
	}
}
