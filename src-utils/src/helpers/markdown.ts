import {
	randomArray,
	randomAvatar,
	randomBool,
	randomFalse,
	randomFromArray,
	randomImageHD,
	randomInt,
	randomText,
	randomTrue,
} from './random'

export const randomMarkdown = () => {
	const fns = [randomMarkdownHeader, randomMarkdownBody]

	return randomArray(randomInt(1, 10)).reduce((acc: string) => {
		return acc + '\n' + randomFromArray(fns)()
	}, '')
}

export const randomMarkdownHeader = () => {
	const prefixes = ['#', '##', '###', '####', '#####', '######']
	return randomFromArray(prefixes) + ' ' + randomText(randomInt(1, 10))
}

export const randomMarkdownBody = () => {
	const prefixes = ['', '', '', '>', '- ', '* ', '+ ', '1. ', '- [ ] ', '- [x] ']
	let counterOL = 0
	let counterBQ = 0

	return randomArray(randomInt(1, 20)).reduce((acc: string) => {
		if (randomFalse()) return acc + randomMarkdownLine()

		let prefix = randomFromArray(prefixes)
		prefix = /[-+*1]/.test(prefix) && randomBool() ? ' '.repeat(4) + prefix : prefix

		counterOL = prefix.includes('1.') ? counterOL + 1 : 0
		counterBQ = prefix.includes('>') ? counterBQ + 1 : 0

		if (prefix.includes('1.')) prefix = prefix.replace('1', String(counterOL))
		if (prefix.includes('>')) prefix = prefix.replace('>', '>'.repeat(counterBQ))

		return acc + prefix + randomMarkdownParagraph()
	}, '')
}

export const randomMarkdownParagraph = () => {
	const marks = ['', '', '', '', '*', '**', '***', '___', '`', '```', '~~']
	const paragraph = randomArray(randomInt(1, 4)).reduce((acc: string) => {
		const mark = randomFromArray(marks)
		const text = randomTrue()
			? randomText(randomInt(1, 10))
			: randomTrue()
				? randomMarkdownLink()
				: randomMarkdownImage()
		return acc + (acc ? ' ' : '') + mark + text + mark
	}, '')

	return paragraph + randomMarkdownBreak()
}

export const randomMarkdownBreak = () => randomFromArray(['. ', '.\n', '.\n\n'])

export const randomMarkdownLine = () => randomFromArray(['---\n', '***\n', '___\n'])

export const randomMarkdownLink = () => `[${randomText(randomInt(0, 10))}](${randomAvatar()})`

export const randomMarkdownImage = () => `![${randomText()}](${randomImageHD()} "${randomText(randomInt(0, 10))}")`
