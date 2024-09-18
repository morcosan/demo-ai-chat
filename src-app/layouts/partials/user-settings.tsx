import { randomAvatar, randomFullName } from '@api/utilities/random.ts'
import GitHubBlackIcon from '@app/library/assets/github-black.svg'
import GitHubWhiteIcon from '@app/library/assets/github-white.svg'
import LogoutIcon from '@app/library/assets/icons-fa-v6/arrow-right-from-bracket.svg'
import DocsIcon from '@app/library/assets/icons-fa-v6/circle-question.svg'
import SettingsIcon from '@app/library/assets/icons-fa-v6/gear.svg'
import NewTabIcon from '@app/library/assets/icons-fa-v6/up-right-from-square.svg'
import StorybookIcon from '@app/library/assets/storybook.svg'
import { Button, useUiLibrary, useUiTheme } from '@ds/release'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'

type SelectEvent = ChangeEvent<HTMLSelectElement>

export const UserSettings = () => {
	const { isLight, isDark, changeTheme } = useUiTheme()
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
			'border border-color-border-soft rounded-md',
		].join(' ')
	}, [opened])

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
				pressed={opened}
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
						className="h-button-h-sm rounded-sm border border-color-border bg-color-bg-default px-xs-2 text-size-xs"
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
							variant={isLight ? 'solid-primary' : 'text-default'}
							size="xs"
							onClick={() => changeTheme('light')}
						>
							☀️ Light&nbsp;
						</Button>
						<Button
							variant={isDark ? 'solid-primary' : 'text-default'}
							size="xs"
							onClick={() => changeTheme('dark')}
						>
							🌙 Dark&nbsp;
						</Button>
					</div>
				</div>

				<hr className={hrClass} />

				<Button linkHref="/docs/api" linkType="external" variant="item-text-default">
					<DocsIcon className={actionIconClass} />
					API Docs
					<NewTabIcon className={newTabIconClass} />
				</Button>

				<Button linkHref={storybookUrl} linkType="external" variant="item-text-default">
					<StorybookIcon className={actionIconClass} />
					Design System
					<NewTabIcon className={newTabIconClass} />
				</Button>

				<Button
					linkHref="https://github.com/morcosan/demo-ai-chat"
					linkType="external"
					variant="item-text-default"
				>
					{Boolean(isLight) && <GitHubBlackIcon className={actionIconClass} />}
					{Boolean(isDark) && <GitHubWhiteIcon className={actionIconClass} />}
					GitHub Repo
					<NewTabIcon className={newTabIconClass} />
				</Button>

				<hr className={hrClass} />

				<Button linkHref="/settings" variant="item-text-default">
					<SettingsIcon className={actionIconClass} />
					Settings
				</Button>

				<hr className={hrClass} />

				<Button linkHref="/logout" variant="item-text-danger">
					<LogoutIcon className={actionIconClass} />
					Sign out
				</Button>
			</div>
		</div>
	)
}
