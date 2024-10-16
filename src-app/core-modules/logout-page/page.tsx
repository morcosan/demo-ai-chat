import { Button } from '@ds/release'

const LogoutPage = () => {
	return (
		<div className="flex-center h-screen w-screen flex-col">
			<h1 className="text-size-xxl font-weight-xl">Logout page</h1>

			<Button linkHref="/" size="lg" className="mt-lg-0">
				{t('core.action.backToHome')}
			</Button>
		</div>
	)
}

export default LogoutPage
