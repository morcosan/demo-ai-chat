import {
	ArrowBackSvg,
	Button,
	GithubBlackSvg,
	GithubWhiteSvg,
	IconButton,
	InfoSvg,
	LogoutSvg,
	NewTabSvg,
	SettingsSvg,
	StorybookSvg,
	useUiLibrary,
	useUiTheme,
} from '@ds/release'

type SelectEvent = ReactChangeEvent<HTMLSelectElement>

interface Props {
	onClickBack?(): void
}

export const SettingsMenu = ({ onClickBack }: Props) => {
	const { isUiLight, isUiDark, changeColorTheme } = useUiTheme()
	const { uiLibrary, changeUiLibrary } = useUiLibrary()

	const storybookUrl = ENV__BUILD_MODE === 'local' ? 'http://localhost:9000' : `${ENV__ROOT_URL_PATH}/storybook`

	const selectClass = [
		'h-button-h-sm rounded-sm border border-color-border-default bg-color-bg-default px-xs-2 text-size-xs',
	].join(' ')
	const hrClass = 'my-xs-2'
	const actionIconClass = 'mr-button-px-item h-xs-8 w-xs-8'
	const newTabIconClass = 'ml-auto mr-px h-xs-6 w-xs-6 fill-color-text-subtle'

	return (
		<div className="flex w-full flex-col gap-xs-3 p-xs-4">
			{/* BACK BUTTON */}
			{Boolean(onClickBack) && (
				<div className="mb-sm-0 mt-xs-3 flex items-center gap-xs-3">
					<IconButton tooltip="Go back to menu" onClick={onClickBack}>
						<ArrowBackSvg className="h-xs-7" />
					</IconButton>
					<span className="pb-xs-0 text-size-lg">Quick settings</span>
				</div>
			)}

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

			<Button linkHref={`${ENV__ROOT_URL_PATH}/docs/api`} linkType="external" variant="item-text-default">
				<InfoSvg className={actionIconClass} />
				API Docs
				<NewTabSvg className={newTabIconClass} />
			</Button>

			<Button linkHref={storybookUrl} linkType="external" variant="item-text-default">
				<StorybookSvg className={actionIconClass} />
				Design System
				<NewTabSvg className={newTabIconClass} />
			</Button>

			<Button linkHref="https://github.com/morcosan/demo-ai-chat" linkType="external" variant="item-text-default">
				{Boolean(isUiLight) && <GithubBlackSvg className={actionIconClass} />}
				{Boolean(isUiDark) && <GithubWhiteSvg className={actionIconClass} />}
				GitHub Repo
				<NewTabSvg className={newTabIconClass} />
			</Button>

			<hr className={hrClass} />

			<Button linkHref="/settings" variant="item-text-default">
				<SettingsSvg className={actionIconClass} />
				Settings
			</Button>

			<hr className={hrClass} />

			<Button linkHref="/logout" variant="item-text-danger">
				<LogoutSvg className={actionIconClass} />
				Sign out
			</Button>
		</div>
	)
}
