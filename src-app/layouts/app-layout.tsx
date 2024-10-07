import { MobileNavbar } from '@app/layouts/navbar/mobile-navbar'
import { useUiViewport } from '@ds/release'
import { DesktopNavbar } from './navbar/desktop-navbar'

interface Props extends ReactProps {
	pageClassName?: string
}

export const AppLayout = ({ pageClassName, children }: Props) => {
	const { isViewportMaxSM } = useUiViewport()

	return (
		<div className={`flex ${isViewportMaxSM ? 'flex-col-reverse' : ''} h-screen w-screen`}>
			{isViewportMaxSM ? <MobileNavbar /> : <DesktopNavbar />}

			<div className={`h-full w-full flex-1 ${pageClassName || ''}`}>{children}</div>
		</div>
	)
}
