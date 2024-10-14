import { Button } from '@ds/release'

const NotFoundPage = () => {
	return (
		<div className="flex-center h-screen w-screen flex-col">
			<div className="text-[140px] font-weight-xl">404</div>
			<h1 className="text-size-xxl font-weight-xl">Page not found</h1>

			<Button linkHref="/" size="lg" className="mt-lg-0">
				{t('core.actions.backToHome')}
			</Button>
		</div>
	)
}

export default NotFoundPage
