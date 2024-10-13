import { Button, CheckSvg, Modal } from '@ds/release'
import { sortBy } from 'lodash'
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
			sortBy(
				Object.entries(LANGUAGES).map(([locale, language]) => ({
					locale: locale as Locale,
					name: language.name,
					nameEn: language.nameEn,
					region: language.region,
					flag: FLAG_SVGS[locale as Locale],
				})),
				(item: LanguageItem) => item.nameEn
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
						<div className="mb-xs-5 text-size-lg">{region.title}</div>

						<div className={cx(gridColClass, 'gap-x-xs-6 gap-y-xs-1')}>
							{region.items.map((item) => (
								<Button
									key={item.locale}
									variant={locale === item.locale ? 'item-solid-secondary' : 'item-text-default'}
									highlight={locale === item.locale ? 'selected' : 'default'}
									size="lg"
									className="px-0"
									onClick={() => setLocale(item.locale)}
								>
									<span className="flex w-full items-center text-left">
										<item.flag className="mx-xs-6 w-sm-0" style={{ fill: 'initial', stroke: 'initial' }} />

										<span className="flex flex-col font-weight-sm leading-1">
											<span className={cx(locale !== item.locale && 'text-color-text-subtle', 'font-weight-md')}>
												{item.name}
											</span>
											<span className={cx(locale !== item.locale && 'text-color-text-subtle', 'text-size-xs')}>
												{item.nameEn}
											</span>
										</span>

										{locale === item.locale && <CheckSvg className="ml-auto mr-xs-4 h-xs-7" />}
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
