declare interface Window {
	__GLOBALS__: StoryGlobals
	__TOOLTIPS__: {
		[key in keyof StoryGlobals]: string
	}
	__ENV__: {
		BUILD_MODE: 'local' | 'dev' | 'prod'
		BUILD_NUMBER: number
		DS_VERSION: string
	}
}
