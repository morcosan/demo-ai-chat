import { LoadingText } from '@app/library/release'
import { CheckSvg, ChevronDownSvg } from '@ds/release'
import { Keyboard } from '@utils/release'
import { debounce } from 'lodash'
import { UIEvent, useCallback, useMemo, useRef, useState } from 'react'
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
		isFocused,
		props,
		setIsFocused,
	} = useSelectFieldBase(rawProps)
	const [keyword, setKeyword] = useState('')
	const [hasKeyboard, setHasKeyboard] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(-1)
	const inputRef = useRef<HTMLInputElement>(null)

	const keyLabel = props.keyLabel as string
	const keyValue = props.keyValue as string
	const options = props.options.filter((option: any) => {
		return !keyword || props.filterFn?.(option, keyword) || option[keyLabel].toLowerCase().includes(keyword)
	})
	const valueOption = (props.options.find((option: any) => option[keyValue] === props.value) as any) || null

	const openOptionsMenu = () => {
		setIsFocused(true)
		setCurrentIndex(-1)
	}

	const onFocusInput = () => {
		openOptionsMenu()
		wait(100).then(() => setHasKeyboard(true)) // Prevent mobile keyboard from opening at start, for better UX
	}

	const onBlurInput = () => {
		setHasKeyboard(false)
		wait(100).then(() => setIsFocused(false)) // Delay is required to allow onClick
	}

	const onSelectOption = (option: any) => {
		props.onChange?.(option[keyValue])
		inputRef.current?.focus()
		setIsFocused(false)
	}

	const execSearch = debounce((value: string) => {
		const keyword = value.trim().toLowerCase()
		setKeyword(keyword)
		props.onSearch?.(keyword)
	}, 300)

	const onChangeInput = (event: ReactChangeEvent<HTMLInputElement>) => {
		execSearch(event.target.value)
	}

	const onKeyDown = useCallback(
		(event: ReactKeyboardEvent) => {
			const arrowFn = (diff: number) => {
				setCurrentIndex((value: number) => ((value > -1 ? value : 0) + diff + options.length) % options.length)
			}
			const isArrowDown = event.key === Keyboard.ARROW_DOWN
			const isArrowUp = event.key === Keyboard.ARROW_UP
			const isTab = event.key === Keyboard.TAB
			const isSubmit = event.key === Keyboard.ENTER || event.key === Keyboard.SPACE

			if (isFocused) {
				if (isArrowDown) arrowFn(1)
				if (isArrowUp) arrowFn(-1)
				if (isSubmit && options[currentIndex] !== undefined) {
					onSelectOption(options[currentIndex])
					event.preventDefault()
				}
			} else {
				!isTab && openOptionsMenu()
			}
		},
		[options, currentIndex, isFocused]
	)

	const onScrollOptions = debounce((event: UIEvent) => {
		const container = event.target as HTMLElement
		const isScrollEnd = container.offsetHeight + container.scrollTop >= container.scrollHeight
		isScrollEnd && props.onScrollEnd?.()
	}, 300)

	const slotOptions = useMemo(
		() => (
			<ul role="listbox" css={cssOptionList} className={cx(!options.length && 'hidden')}>
				{options.map((option: any, index: number) => (
					<li
						key={option[keyValue]}
						id={`${props.id}-option-${index}`}
						role="option"
						aria-selected={option[keyValue] === props.value}
						data-current={index === currentIndex}
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
			</ul>
		),
		[options]
	)

	return (
		<div className={props.className} style={props.style} css={cssWrapper}>
			<div css={[cssFieldBase, cssHeight, cssRadius, isFocused && cssFieldFocus]}>
				{/* SEARCH */}
				<input
					ref={inputRef}
					id={props.id}
					type="text"
					role="combobox"
					readOnly={!hasKeyboard}
					placeholder={props.placeholder}
					aria-label={props.ariaLabel}
					aria-describedby={`${props.id}-value`}
					aria-expanded={isFocused}
					aria-autocomplete="list"
					aria-haspopup="listbox"
					aria-activedescendant={currentIndex > -1 ? `${props.id}-option-${currentIndex}` : ''}
					css={cssInput}
					onFocus={onFocusInput}
					onBlur={onBlurInput}
					onChange={onChangeInput}
					onKeyDown={onKeyDown}
					onClick={() => !isFocused && openOptionsMenu()}
				/>

				{/* VALUE */}
				<div id={`${props.id}-value`} css={cssValueOption}>
					<span className="sr-only">{t('aiChat.label.selectedValue')}</span>

					{props.compValue && valueOption ? (
						<props.compValue option={valueOption} selected />
					) : (
						<span className="line-clamp-1">{valueOption?.[keyLabel]}</span>
					)}

					<span className="sr-only">{props.ariaDescription}</span>
				</div>

				{/* ARROW */}
				<div css={cssArrow}>
					{props.loading || props.loadingMore ? (
						<span className="animate-spin text-size-sm">⌛</span>
					) : (
						<ChevronDownSvg className="h-xs-5" />
					)}
				</div>
			</div>

			{/* POPUP */}
			<div css={cssPopup} onScroll={onScrollOptions}>
				{props.loading ? (
					<LoadingText
						text={props.loadingText || t('core.state.loading')}
						className="ml-xs-3 min-h-button-h-lg px-button-px-item text-size-sm"
					/>
				) : (
					<>
						{slotOptions}

						{Boolean(props.canLoadMore) && (
							<LoadingText
								text={props.loadingText || t('core.state.loading')}
								className="relative -top-xs-2 ml-xs-3 min-h-button-h-md px-button-px-item text-size-sm"
								style={{ visibility: props.loadingMore ? 'visible' : 'hidden' }}
							/>
						)}

						{!options.length && (
							<div className="flex min-h-button-h-lg items-center px-button-px-item text-size-sm">
								{t('core.error.nothingFound', { search: keyword })}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}
