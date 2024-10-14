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
import { getActiveFlagSvg, getActiveLanguage } from '@i18n/release'

type SelectEvent = ReactChangeEvent<HTMLSelectElement>

interface Props {
	onClickLanguage(): void
	onClickBack?(): void
}

export const SettingsMenu = ({ onClickBack, onClickLanguage }: Props) => {
	const { isUiLight, isUiDark, changeColorTheme } = useUiTheme()
	const { uiLibrary, changeUiLibrary } = useUiLibrary()

	const FlagSvg = getActiveFlagSvg()

	const storybookUrl = ENV__BUILD_MODE === 'local' ? 'http://localhost:9000' : `${ENV__ROOT_URL_PATH}/storybook`

	const hrClass = 'my-xs-2'
	const actionIconClass = 'mr-button-px-item h-xs-8 w-xs-8'
	const newTabIconClass = 'ml-auto mr-px min-w-xs-6 w-xs-6 text-color-text-subtle'

	return (
		<div className="flex w-full flex-col gap-xs-3 p-xs-4">
			{/* BACK BUTTON */}
			{Boolean(onClickBack) && (
				<div className="mb-sm-0 mt-xs-3 flex items-center gap-xs-3">
					<IconButton tooltip="Go back to menu" onClick={onClickBack}>
						<ArrowBackSvg className="h-xs-7" />
					</IconButton>
					<span className="pb-xs-0 text-size-lg">{t('core.quickSettings')}</span>
				</div>
			)}

			{/* UI LIBRARY */}
			<div className="mb-xs-1 mt-xs-3 flex items-center justify-between px-button-px-item">
				<span>{t('core.uiLibrary')}</span>

				<select
					className={cx(
						'h-button-h-sm border border-color-border-default px-xs-2',
						'rounded-sm bg-color-bg-default text-size-xs'
					)}
					value={uiLibrary}
					onChange={(event: SelectEvent) => changeUiLibrary(event.target?.value as UiLibrary)}
				>
					<option value={'custom' as UiLibrary}>{t('core.custom')}</option>
					<option value={'material' as UiLibrary}>Material UI</option>
					<option value={'antdesign' as UiLibrary}>Ant Design</option>
				</select>
			</div>

			{/* THEME */}
			<div className="flex items-center justify-between px-button-px-item">
				<span>{t('core.uiTheme')}</span>

				<div className="flex flex-col gap-xs-1">
					<Button
						variant={isUiLight ? 'solid-primary' : 'text-default'}
						size="xs"
						onClick={() => changeColorTheme('light')}
					>
						☀️ {t('core.lightTheme')}&nbsp;
					</Button>
					<Button
						variant={isUiDark ? 'solid-primary' : 'text-default'}
						size="xs"
						onClick={() => changeColorTheme('dark')}
					>
						🌙 {t('core.darkTheme')}&nbsp;
					</Button>
				</div>
			</div>

			<hr className={hrClass} />

			<Button linkHref={`${ENV__ROOT_URL_PATH}/docs/api`} linkType="external" variant="item-text-default">
				<InfoSvg className={actionIconClass} />
				{t('core.apiDocs')}
				<NewTabSvg className={newTabIconClass} />
			</Button>

			<Button linkHref={storybookUrl} linkType="external" variant="item-text-default">
				<StorybookSvg className={actionIconClass} />
				{t('core.designSystem')}
				<NewTabSvg className={newTabIconClass} />
			</Button>

			<Button linkHref="https://github.com/morcosan/demo-ai-chat" linkType="external" variant="item-text-default">
				{Boolean(isUiLight) && <GithubBlackSvg className={actionIconClass} />}
				{Boolean(isUiDark) && <GithubWhiteSvg className={actionIconClass} />}
				{t('core.githubRepo')}
				<NewTabSvg className={newTabIconClass} />
			</Button>

			<hr className={hrClass} />

			<Button variant="item-text-default" onClick={onClickLanguage}>
				<FlagSvg className={cx(actionIconClass, 'h-unset')} style={{ fill: 'initial', stroke: 'initial' }} />
				<span className="flex flex-1 items-center justify-between">
					{t('core.language')}
					<span className="ml-xs-1 text-size-sm text-color-text-subtle">{getActiveLanguage().name}</span>
				</span>
			</Button>

			<Button linkHref="/settings" variant="item-text-default">
				<SettingsSvg className={actionIconClass} />
				{t('core.settings')}
			</Button>

			<hr className={hrClass} />

			<Button linkHref="/logout" variant="item-text-danger">
				<LogoutSvg className={actionIconClass} />
				{t('core.actions.signOut')}
			</Button>
		</div>
	)
}
