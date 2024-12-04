import { ViewportSize } from '../constants/viewport'

export const getIntByViewport = (values: [number, number, number, number]): number => {
	if (window.innerHeight >= ViewportSize.HEIGHT_4K) return values[3]
	if (window.innerHeight >= ViewportSize.HEIGHT_2K) return values[2]
	if (window.innerHeight >= ViewportSize.HEIGHT_FHD) return values[1]
	return values[0]
}
