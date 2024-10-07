import { createContext } from 'react'

export interface Store {
	viewportWidth: number

	isViewportMinXS: boolean
	isViewportMinSM: boolean
	isViewportMinMD: boolean
	isViewportMinLG: boolean
	isViewportMinXL: boolean
	isViewportMinXXL: boolean

	isViewportMaxXS: boolean
	isViewportMaxSM: boolean
	isViewportMaxMD: boolean
	isViewportMaxLG: boolean
	isViewportMaxXL: boolean
	isViewportMaxXXL: boolean

	isViewportXS: boolean
	isViewportSM: boolean
	isViewportMD: boolean
	isViewportLG: boolean
	isViewportXL: boolean
	isViewportXXL: boolean
}

export const Context = createContext<Store>({
	viewportWidth: 0,

	isViewportMinXS: false,
	isViewportMinSM: false,
	isViewportMinMD: false,
	isViewportMinLG: false,
	isViewportMinXL: false,
	isViewportMinXXL: false,

	isViewportMaxXS: false,
	isViewportMaxSM: false,
	isViewportMaxMD: false,
	isViewportMaxLG: false,
	isViewportMaxXL: false,
	isViewportMaxXXL: false,

	isViewportXS: false,
	isViewportSM: false,
	isViewportMD: false,
	isViewportLG: false,
	isViewportXL: false,
	isViewportXXL: false,
})
