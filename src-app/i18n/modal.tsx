import { Button, CheckSvg, Modal } from '@ds/release'
import { sortBy } from 'lodash'
import { useMemo } from 'react'
import { FLAG_SVGS, getActiveLocale, LANGUAGES, Locale, Region, setActiveLocale } from './index'

interface Props {
	opened: boolean
	onClose(): void
}

interface RegionItem {
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
				title: 'Default',
				items: items.filter((item: LanguageItem) => item.region === 'default'),
			},
			{
				title: 'Europe',
				items: items.filter((item: LanguageItem) => item.region === 'europe'),
			},
			{
				title: 'Asia',
				items: items.filter((item: LanguageItem) => item.region === 'asia'),
			},
		],
		[]
	)

	const gridColClass = 'grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '

	const onSubmit = (locale: Locale) => {
		setActiveLocale(locale)
		onClose()
	}

	const renderItem = (item: LanguageItem) => {
		const isSelected = getActiveLocale() === item.locale

		return (
			<Button
				key={item.locale}
				variant={isSelected ? 'item-solid-secondary' : 'item-text-default'}
				highlight={isSelected ? 'selected' : 'default'}
				size="lg"
				className="px-0"
				onClick={() => onSubmit(item.locale)}
			>
				<span className="flex w-full items-center text-left">
					<item.flag className="mx-xs-6 w-sm-0" style={{ fill: 'initial', stroke: 'initial' }} />

					<span className={cx('flex flex-col leading-1', isSelected ? 'font-weight-md' : 'font-weight-sm')}>
						<span className={cx(!isSelected && 'text-color-text-default')}>{item.name}</span>
						<span className={cx(!isSelected && 'text-color-text-subtle', 'text-size-xs')}>{item.nameEn}</span>
					</span>

					{Boolean(isSelected) && <CheckSvg className="ml-auto mr-xs-4 h-xs-7" />}
				</span>
			</Button>
		)
	}

	return (
		<Modal opened={opened} width="lg" slotTitle="Change language" noFooter onClose={onClose}>
			<div className="flex flex-col gap-sm-5">
				{regionItems.map((region) => (
					<div key={region.title}>
						<div className="mb-xs-5 text-size-lg">{region.title}</div>

						<div className={cx(gridColClass, 'gap-x-xs-6 gap-y-xs-1')}>{region.items.map(renderItem)}</div>
					</div>
				))}
			</div>
		</Modal>
	)
}
