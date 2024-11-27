import { LoadingText } from '@app/library/release'
import { IconButton, SettingsSvg } from '@ds/release'
import { debounce } from 'lodash'
import { CSSProperties, UIEvent } from 'react'

interface Props extends ReactProps {
	length: number
	pagination: Pagination
	loading: ListLoading
	headerText: string
	settingsHref: string
	settingsText: string
	loadingText: string
	emptyText: string
	headerClass?: string
	listingClass?: string
	listingStyle?: CSSProperties
	collapsed?: boolean
	onScrollEnd(): void
}

export const NavListing = (props: Props) => {
	const onScrollListing = debounce((event: UIEvent) => {
		const container = event.target as HTMLElement
		const isScrollEnd = container.offsetHeight + container.scrollTop >= container.scrollHeight
		isScrollEnd && props.onScrollEnd()
	}, 300)

	return (
		<>
			{/* HEADER */}
			<div className={cx('flex h-button-h-xs w-full items-center justify-between', props.headerClass)}>
				<span className="ml-button-px-item truncate text-size-sm text-color-text-subtle">
					{props.headerText}
					&nbsp;
					{Boolean(props.pagination.count) && <span className="text-size-xs">({props.pagination.count})</span>}
				</span>

				<IconButton
					tooltip={props.settingsText}
					linkHref={props.settingsHref}
					size="sm"
					className={cx(props.collapsed && 'hidden')}
				>
					<SettingsSvg className="h-xs-5 text-color-text-subtle" />
				</IconButton>
			</div>

			{/* LISTING */}
			<div
				className={cx(
					'-mx-a11y-scrollbar flex flex-col overflow-y-scroll p-a11y-padding !pl-a11y-scrollbar',
					props.listingClass
				)}
				style={{ width: 'calc(100% + 2 * var(--ds-spacing-a11y-scrollbar))', ...props.listingStyle }}
				onScroll={onScrollListing}
			>
				{props.loading === 'full' ? (
					<LoadingText
						text={props.loadingText}
						collapsed={props.collapsed}
						className="min-h-sm-4 px-button-px-item text-size-sm"
					/>
				) : props.length ? (
					<>
						{props.children}
						{props.length < props.pagination.count && (
							<LoadingText
								text={props.loadingText}
								collapsed={props.collapsed}
								className="line-clamp-1 min-h-sm-4 px-button-px-item text-size-sm"
								style={{ visibility: props.loading === 'more' ? 'visible' : 'hidden' }}
							/>
						)}
					</>
				) : (
					<div className="ml-button-px-item mt-xs-2 text-size-sm">{props.emptyText}</div>
				)}
			</div>
		</>
	)
}
