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
