declare interface Window {
	__GLOBALS__: StoryGlobals
	__TOOLTIPS__: {
		[key in keyof StoryGlobals]: string
	}
}
