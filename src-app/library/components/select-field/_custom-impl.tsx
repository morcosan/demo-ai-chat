import { CheckSvg, ChevronDownSvg } from '@ds/release'
import { Keyboard } from '@utils/release'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useSelectFieldBase } from './_base'
import { SelectFieldProps } from './_types'

export const CustomImpl = (rawProps: SelectFieldProps) => {
	const {
		cssArrow,
		cssFieldBase,
		cssFieldFocus,
		cssHeight,
		cssInput,
		cssOption,
		cssOptionList,
		cssPopup,
		cssRadius,
		cssValueOption,
		cssWrapper,
		isOpened,
		props,
		setIsOpened,
	} = useSelectFieldBase(rawProps)
	const [search, setSearch] = useState('')
	const [optionIndex, setOptionIndex] = useState(-1)
	const inputRef = useRef<HTMLInputElement>(null)

	const keyLabel = props.keyLabel as string
	const keyValue = props.keyValue as string
	const keyword = search.trim().toLowerCase()
	const valueOption = (props.options.find((option: any) => option[keyValue] === props.value) as any) || null
	const options = props.options.filter((option: any) => option[keyLabel].toLowerCase().includes(keyword))

	const openMenu = () => {
		setIsOpened(true)
		setSearch('')
		setOptionIndex(-1)
	}

	const onBlurInput = () => wait(100).then(() => setIsOpened(false)) // Delay is required to allow onClick

	const onSelectOption = (option: any) => {
		props.onChange?.(option[keyValue])
		inputRef.current?.focus()
		setIsOpened(false)
	}

	const onChangeInput = (event: ReactChangeEvent<HTMLInputElement>) => setSearch(event.target.value)

	const onKeyDown = useCallback(
		(event: ReactKeyboardEvent) => {
			const arrowFn = (diff: number) => {
				setOptionIndex((value: number) => ((value > -1 ? value : 0) + diff + options.length) % options.length)
			}
			const isArrowDown = event.key === Keyboard.ARROW_DOWN
			const isArrowUp = event.key === Keyboard.ARROW_UP
			const isTab = event.key === Keyboard.TAB
			const isSubmit = event.key === Keyboard.ENTER || event.key === Keyboard.SPACE

			if (isOpened) {
				if (isArrowDown) arrowFn(1)
				if (isArrowUp) arrowFn(-1)
				if (isSubmit && options[optionIndex] !== undefined) {
					onSelectOption(options[optionIndex])
					event.preventDefault()
				}
			} else {
				!isTab && openMenu()
			}
		},
		[options, optionIndex, isOpened]
	)

	const slotOptions = useMemo(
		() => (
			<ul role="listbox" css={cssOptionList}>
				{options.map((option: any, index: number) => (
					<li
						key={option[keyValue]}
						id={`${props.id}-option-${index}`}
						role="option"
						aria-selected={option[keyValue] === props.value}
						data-current={index === optionIndex}
						css={cssOption}
						onClick={() => onSelectOption(option)}
					>
						<div className="flex-1">
							{props.compOption ? (
								<props.compOption option={option} selected={option[keyValue] === props.value} />
							) : (
								option[keyLabel]
							)}
						</div>

						{option[keyValue] === props.value && <CheckSvg className="h-xs-6" />}
					</li>
				))}

				{!options.length && <li css={cssOption}>{t('core.error.nothingFound', { search: search })}</li>}
			</ul>
		),
		[options]
	)

	return (
		<div className={props.className} style={props.style} css={cssWrapper}>
			<div css={[cssFieldBase, cssHeight, cssRadius, isOpened && cssFieldFocus]}>
				<input
					ref={inputRef}
					id={props.id}
					type="text"
					role="combobox"
					value={search}
					placeholder={props.placeholder}
					aria-label={props.ariaLabel}
					aria-describedby={`${props.id}-value`}
					aria-expanded={isOpened}
					aria-autocomplete="list"
					aria-haspopup="listbox"
					aria-activedescendant={optionIndex > -1 ? `${props.id}-option-${optionIndex}` : ''}
					css={cssInput}
					onFocus={openMenu}
					onBlur={onBlurInput}
					onChange={onChangeInput}
					onKeyDown={onKeyDown}
					onClick={() => !isOpened && openMenu()}
				/>

				<div id={`${props.id}-value`} css={cssValueOption}>
					<span className="sr-only">{t('aiChat.label.selectedValue')}</span>

					{props.compValue && valueOption ? (
						<props.compValue option={valueOption} selected />
					) : (
						<span className="line-clamp-1">{valueOption?.[keyLabel]}</span>
					)}

					<span className="sr-only">{props.ariaDescription}</span>
				</div>

				<div css={cssArrow}>
					<ChevronDownSvg className="h-xs-5" />
				</div>
			</div>

			{/* POPUP */}
			<div css={cssPopup}>{slotOptions}</div>
		</div>
	)
}
