import { randomArray, randomFromArray, randomInt, randomText } from './random'

export const randomMarkdown = () => {
	const fns = [randomMarkdownHeading, randomMarkdownText]

	return randomArray(randomInt(1, 10)).reduce((acc: string) => {
		return acc + '\n' + randomFromArray(fns)()
	}, '')
}

export const randomMarkdownHeading = () => {
	const prefixes = ['#', '##', '###', '####', '#####', '######']
	return randomFromArray(prefixes) + ' ' + randomText(randomInt(1, 10))
}

export const randomMarkdownText = () => {
	return randomArray(randomInt(1, 20)).reduce((acc: string) => {
		return acc + randomMarkdownParagraph()
	}, '')
}

export const randomMarkdownParagraph = () => {
	const marks = ['', '', '', '', '*', '**', '***', '___', '`', '```']
	const paragraph = randomArray(randomInt(1, 4)).reduce((acc: string) => {
		const mark = randomFromArray(marks)
		return acc + ' ' + mark + randomText(randomInt(1, 10)) + mark
	}, '')

	return paragraph + randomMarkdownBreak()
}

export const randomMarkdownBreak = () => {
	return randomFromArray(['. ', '.\n', '.\n\n'])
}
