import { Button, useUiLibrary, useUiTheme } from '@ds/release'
import InfoSvg from '@ds/release/icons/info.svg'
import LogoutSvg from '@ds/release/icons/logout.svg'
import NewTabSvg from '@ds/release/icons/new-tab.svg'
import SettingSvg from '@ds/release/icons/setting.svg'
import GithubBlackSvg from '@ds/release/logos/github-black.svg'
import GithubWhiteSvg from '@ds/release/logos/github-white.svg'
import StorybookSvg from '@ds/release/logos/storybook.svg'
import { randomAvatar, randomFullName } from '@utils/release'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'

type SelectEvent = ChangeEvent<HTMLSelectElement>

export const UserSettings = () => {
	const { isUiLight, isUiDark, changeColorTheme } = useUiTheme()
	const { uiLibrary, changeUiLibrary } = useUiLibrary()
	const [opened, setOpened] = useState(false)

	const storybookUrl = ENV__BUILD_MODE === 'local' ? 'http://localhost:9000' : `${ENV__ROOT_URL_PATH}/storybook`

	const avatar = useMemo(() => randomAvatar(), [])
	const name = useMemo(() => randomFullName(), [])

	const menuClass = useMemo(() => {
		return [
			opened ? 'block' : 'hidden',
			'absolute bottom-0 right-0 translate-x-full z-popup shadow-lg',
			'flex w-lg-6 p-xs-4 flex-col gap-xs-3 bg-color-bg-default',
			'border border-color-border-shadow rounded-md',
		].join(' ')
	}, [opened])
	const selectClass = [
		'h-button-h-sm rounded-sm border border-color-border-default bg-color-bg-default px-xs-2 text-size-xs',
	].join(' ')
	const hrClass = 'my-xs-2'
	const actionIconClass = 'mr-button-px-item h-xs-8 w-xs-8'
	const newTabIconClass = 'ml-auto mr-px h-xs-6 w-xs-6 fill-color-text-subtle'

	const wrapperRef = useRef<HTMLDivElement>(null)

	const onClickWindow = (event: MouseEvent) => {
		const target = event.target as HTMLElement
		const wrapper = wrapperRef.current

		if (wrapper && !wrapper.contains(target)) {
			setOpened(false)
		}
	}

	useEffect(() => {
		window.addEventListener('mousedown', onClickWindow)

		return () => {
			window.removeEventListener('mousedown', onClickWindow)
		}
	}, [])

	return (
		<div ref={wrapperRef} className="relative">
			<Button
				variant="item-text-default"
				size="lg"
				className="w-full"
				state={opened ? 'pressed' : 'default'}
				onClick={() => setOpened(!opened)}
			>
				<img src={avatar} alt="" className="h-sm-2 w-sm-2 rounded-full" />
				<span className="ml-button-px-item text-size-md font-weight-sm">{name}</span>
			</Button>

			{/* MENU */}
			<div className={menuClass}>
				{/* UI LIBRARY */}
				<div className="mb-xs-1 mt-xs-3 flex items-center justify-between px-button-px-item">
					<span>UI Library:</span>

					<select
						className={selectClass}
						value={uiLibrary}
						onChange={(event: SelectEvent) => changeUiLibrary(event.target?.value as UiLibrary)}
					>
						<option value={'custom' as UiLibrary}>Custom</option>
						<option value={'material' as UiLibrary}>Material UI</option>
						<option value={'antdesign' as UiLibrary}>Ant Design</option>
					</select>
				</div>

				{/* THEME */}
				<div className="flex items-center justify-between px-button-px-item">
					<span>UI Theme:</span>

					<div className="flex flex-col gap-xs-1">
						<Button
							variant={isUiLight ? 'solid-primary' : 'text-default'}
							size="xs"
							onClick={() => changeColorTheme('light')}
						>
							☀️ Light&nbsp;
						</Button>
						<Button
							variant={isUiDark ? 'solid-primary' : 'text-default'}
							size="xs"
							onClick={() => changeColorTheme('dark')}
						>
							🌙 Dark&nbsp;
						</Button>
					</div>
				</div>

				<hr className={hrClass} />

				<Button linkHref="/docs/api" linkType="external" variant="item-text-default">
					<InfoSvg className={actionIconClass} />
					API Docs
					<NewTabSvg className={newTabIconClass} />
				</Button>

				<Button linkHref={storybookUrl} linkType="external" variant="item-text-default">
					<StorybookSvg className={actionIconClass} />
					Design System
					<NewTabSvg className={newTabIconClass} />
				</Button>

				<Button
					linkHref="https://github.com/morcosan/demo-ai-chat"
					linkType="external"
					variant="item-text-default"
				>
					{Boolean(isUiLight) && <GithubBlackSvg className={actionIconClass} />}
					{Boolean(isUiDark) && <GithubWhiteSvg className={actionIconClass} />}
					GitHub Repo
					<NewTabSvg className={newTabIconClass} />
				</Button>

				<hr className={hrClass} />

				<Button linkHref="/settings" variant="item-text-default">
					<SettingSvg className={actionIconClass} />
					Settings
				</Button>

				<hr className={hrClass} />

				<Button linkHref="/logout" variant="item-text-danger">
					<LogoutSvg className={actionIconClass} />
					Sign out
				</Button>
			</div>
		</div>
	)
}
