import { Button, Modal } from '@ds/release'
import { useEffect, useMemo, useState } from 'react'
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
	const [locale, setLocale] = useState(getActiveLocale())

	const items: LanguageItem[] = useMemo(
		() =>
			Object.entries(LANGUAGES).map(([locale, language]) => ({
				locale: locale as Locale,
				name: language.name,
				nameEn: language.nameEn,
				region: language.region,
				flag: FLAG_SVGS[locale as Locale],
			})),
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

	const gridClass = 'grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-sm-4 gap-y-xs-1'

	const onSubmit = () => {
		setActiveLocale(locale)
		onClose()
	}

	useEffect(() => {
		opened && setLocale(getActiveLocale())
	}, [opened])

	const slotButtons = (
		<Button variant="solid-primary" onClick={onSubmit}>
			Apply
		</Button>
	)

	return (
		<Modal opened={opened} width="lg" slotTitle="Change language" slotButtons={slotButtons} onClose={onClose}>
			<div className="flex flex-col gap-sm-5">
				{regionItems.map((region) => (
					<div key={region.title}>
						<div className="mb-xs-4 px-button-px-item text-size-lg">{region.title}</div>

						<div className={gridClass}>
							{region.items.map((item) => (
								<Button
									key={item.locale}
									variant={locale === item.locale ? 'item-solid-secondary' : 'item-text-default'}
									highlight={locale === item.locale ? 'selected' : 'default'}
									className="w-lg-3"
									onClick={() => setLocale(item.locale)}
								>
									<span className="flex gap-button-px-item">
										<item.flag className="h-xs-9 w-xs-9" />
										{item.name}
									</span>
								</Button>
							))}
						</div>
					</div>
				))}
			</div>
		</Modal>
	)
}
