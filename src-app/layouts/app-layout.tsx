import { NavBar } from './navbar.tsx'

interface Props extends ReactProps {
	pageClassName?: string
}

export const AppLayout = ({ pageClassName, children }: Props) => {
	return (
		<div className="flex h-screen w-screen">
			<NavBar />

			<div className={`${pageClassName} h-full w-full`}>{children}</div>
		</div>
	)
}
