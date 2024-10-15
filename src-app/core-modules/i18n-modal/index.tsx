import { Button, CheckSvg, Modal } from '@ds/release'
import { FLAG_SVGS, LANGUAGES, Locale, Region, useI18n } from '@i18n/release'
import { sortBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

interface Props {
	opened: boolean
	onClose(): void
}

interface RegionItem {
	key: Region
	title: string
	items: LanguageItem[]
}

interface LanguageItem {
	locale: Locale
	name: string
	nameEn: string
	region: Region
	flag: JsxFn
}

export const I18nModal = ({ opened, onClose }: Props) => {
	const { loading, activeLocale, changeLocale } = useI18n()
	const [currentLocale, setCurrentLocale] = useState(activeLocale)

	const items: LanguageItem[] = useMemo(
		() =>
			sortBy(
				Object.entries(LANGUAGES).map(([locale, language]) => ({
					locale: locale as Locale,
					name: language.name,
					nameEn: language.nameEn,
					region: language.region,
					flag: FLAG_SVGS[locale as Locale],
				})),
				(item: LanguageItem) => (item.region === 'default' ? '' : item.nameEn)
			),
		[]
	)

	const regionItems: RegionItem[] = useMemo(
		() => [
			{
				key: 'default',
				title: t('core.default'),
				items: items.filter((item: LanguageItem) => item.region === 'default'),
			},
			{
				key: 'europe',
				title: t('core.europe'),
				items: items.filter((item: LanguageItem) => item.region === 'europe'),
			},
			{
				key: 'asia',
				title: t('core.asia'),
				items: items.filter((item: LanguageItem) => item.region === 'asia'),
			},
		],
		[activeLocale, loading]
	)

	const gridColClass = 'grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '

	const onClickItem = (locale: Locale) => {
		setCurrentLocale(locale)
		changeLocale(locale)
	}

	const renderItem = (item: LanguageItem) => {
		const isSelected = activeLocale === item.locale
		const isLoading = !isSelected && currentLocale == item.locale

		return (
			<Button
				key={item.locale}
				variant={isSelected ? 'item-solid-secondary' : 'item-text-default'}
				highlight={isSelected ? 'selected' : isLoading ? 'pressed' : 'default'}
				size="lg"
				className="px-0"
				onClick={() => onClickItem(item.locale)}
			>
				<span className="flex w-full items-center text-left">
					{isLoading ? (
						<span className="flex-center mx-xs-6 w-sm-0">
							<span className="animate-spin">⌛</span>
						</span>
					) : (
						<item.flag className="mx-xs-6 w-sm-0" style={{ fill: 'initial', stroke: 'initial' }} />
					)}

					<span className={cx('flex flex-col leading-1', isSelected ? 'font-weight-md' : 'font-weight-sm')}>
						<span className={cx(!isSelected && 'text-color-text-default')}>{item.name}</span>
						<span className={cx(!isSelected && 'text-color-text-subtle', 'text-size-xs')}>{item.nameEn}</span>
					</span>

					{Boolean(isSelected) && <CheckSvg className="ml-auto mr-xs-4 h-xs-7" />}
				</span>
			</Button>
		)
	}

	useEffect(() => {
		!loading && setCurrentLocale(activeLocale)
	}, [loading, activeLocale])

	return (
		<Modal
			opened={opened}
			width="lg"
			slotTitle={t('core.action.changeLanguage')}
			shallow
			noFooter
			onClose={onClose}
		>
			<div className="flex flex-col gap-sm-5">
				{regionItems.map((region) => (
					<div key={region.key}>
						<div className="mb-xs-5 text-size-lg">{region.title}</div>

						<div className={cx(gridColClass, 'gap-x-xs-6 gap-y-xs-1')}>{region.items.map(renderItem)}</div>
					</div>
				))}
			</div>
		</Modal>
	)
}
