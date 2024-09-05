import { Button } from '@ds/release'

const LogoutPage = () => {
	return (
		<div className="flex-center h-screen w-screen flex-col">
			<h1 className="text-size-xxl font-weight-xl">Logout page</h1>

			<Button linkTo="/" linkType="same-tab" variant="solid-primary" size="lg" className="mt-lg-0">
				Go back to homepage
			</Button>
		</div>
	)
}

export default LogoutPage
