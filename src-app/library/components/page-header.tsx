import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props extends ReactProps {
	breadcrumb?: {
		href: string
		title: string
	}
	slotTitle?: ReactNode
	slotRight?: ReactNode
}

export const PageHeader = ({ breadcrumb, slotTitle, slotRight }: Props) => {
	return (
		<div className="mb-sm-0 flex items-center lg:mb-sm-3">
			<h1 className="flex items-center text-size-xl font-weight-lg lg:text-size-xxl">
				{breadcrumb !== undefined && (
					<>
						<Link to={breadcrumb.href} className="ds-header-link">
							{breadcrumb.title}
						</Link>
						<span className="mx-xs-2 font-weight-xs">/</span>
					</>
				)}
				{slotTitle}
			</h1>

			{slotRight}
		</div>
	)
}
