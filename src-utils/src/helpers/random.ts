import { en, Faker } from '@faker-js/faker'
import { capitalize } from 'lodash'

let _faker = new Faker({ locale: en })

// Seed
export const setRandomSeed = (seed: number) => _faker.seed(seed)
export const resetRandomSeed = () => (_faker = new Faker({ locale: en }))

// Number
let _randomId = 1001
export const randomId = () => _randomId++
export const randomInt = (min: number, max: number) => _faker.number.int({ min, max })
export const randomFloat = (min: number, max: number) => _faker.number.float({ min, max, fractionDigits: 2 })

// Boolean
export const randomBool = () => _faker.datatype.boolean()
export const randomTrue = () => randomInt(1, 5) > 1 // 80% chance to be true
export const randomFalse = () => randomInt(1, 5) === 1 // 80% chance to be false

// Array
export const randomArray = (min: number, max?: number) => Array.from(Array(randomInt(min, max || min)))
export const randomFromArray = <T = any>(array: T[]) => array[randomInt(0, array.length - 1)]

// String
export const randomText = (words: number = 5) => capitalize(_faker.lorem.words(words))
export const randomLongText = (sentences: number = 5) => _faker.lorem.sentences(sentences)

// Date
export const randomRecentDate = () => _faker.date.recent().toISOString()

// Images
export const randomAvatar = () => _faker.image.url({ width: 512, height: 512 }) + '.jpg'
export const randomImageHD = () => _faker.image.url({ width: 1280, height: 720 }) + '.jpg'
export const randomImageFHD = () => _faker.image.url({ width: 1920, height: 1080 }) + '.jpg'

// Names
export const randomFirstName = () => _faker.person.firstName()
export const randomLastName = () => _faker.person.lastName()
export const randomFullName = () => `${_faker.person.firstName()} ${_faker.person.lastName()}`
