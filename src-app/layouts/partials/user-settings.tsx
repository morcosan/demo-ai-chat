import { randomAvatar, randomFullName } from '@api/utilities/random.ts'
import GitHubBlackIcon from '@app/library/assets/github-black.svg'
import GitHubWhiteIcon from '@app/library/assets/github-white.svg'
import LogoutIcon from '@app/library/assets/icons-fa-v6/arrow-right-from-bracket.svg'
import DocsIcon from '@app/library/assets/icons-fa-v6/circle-question.svg'
import SettingsIcon from '@app/library/assets/icons-fa-v6/gear.svg'
import NewTabIcon from '@app/library/assets/icons-fa-v6/up-right-from-square.svg'
import StorybookIcon from '@app/library/assets/storybook.svg'
import { Button, useColorThemeStore } from '@ds/release'
import { useEffect, useMemo, useRef, useState } from 'react'

export const UserSettings = () => {
	const { isLight, isDark, changeTheme } = useColorThemeStore()
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

	const actionClass = 'flex w-full items-center px-xs-5 text-left font-weight-sm'
	const actionIconClass = 'mr-xs-5 h-xs-8 w-xs-8 fill-color-text-default'
	const newTabIconClass = 'ml-xs-4 mr-px h-xs-6 w-xs-6 fill-color-text-subtle'

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
			<Button variant="text-default" size="lg" pressed={opened} expanded onClick={() => setOpened(!opened)}>
				<span className="flex w-full items-center gap-xs-4 px-xs-4">
					<img src={avatar} alt="" className="h-sm-3 w-sm-3 rounded-full" />
					<span className="text-size-md font-weight-sm">{name}</span>
				</span>
			</Button>

			{/* MENU */}
			<div className={menuClass}>
				<div className="flex items-center justify-between px-xs-5">
					<span>Theme:</span>

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

				<Button linkTo="/docs/api" variant="text-default" size="md" expanded>
					<span className={`${actionClass} justify-between`}>
						<span className="flex items-center">
							<DocsIcon className={actionIconClass} />
							API Docs
						</span>
						<NewTabIcon className={newTabIconClass} />
					</span>
				</Button>

				<Button linkTo={storybookUrl} variant="text-default" size="md" expanded>
					<span className={`${actionClass} justify-between`}>
						<span className="flex items-center">
							<StorybookIcon className={actionIconClass} />
							Design System
						</span>
						<NewTabIcon className={newTabIconClass} />
					</span>
				</Button>

				<Button linkTo="https://github.com/morcosan/demo-ai-chat" variant="text-default" size="md" expanded>
					<span className={`${actionClass} justify-between`}>
						<span className="flex items-center">
							{Boolean(isLight) && <GitHubBlackIcon className={actionIconClass} />}
							{Boolean(isDark) && <GitHubWhiteIcon className={actionIconClass} />}
							GitHub Repo
						</span>
						<NewTabIcon className={newTabIconClass} />
					</span>
				</Button>

				<hr className={hrClass} />

				<Button linkTo="/settings" linkType="same-tab" variant="text-default" size="md" expanded>
					<span className={actionClass}>
						<SettingsIcon className={actionIconClass} />
						Settings
					</span>
				</Button>

				<hr className={hrClass} />

				<Button linkTo="/logout" linkType="same-tab" variant="text-default" size="md" expanded>
					<span className={`${actionClass} !font-weight-md text-color-failure`}>
						<LogoutIcon className={`${actionIconClass} !fill-color-failure`} />
						Sign out
					</span>
				</Button>
			</div>
		</div>
	)
}
