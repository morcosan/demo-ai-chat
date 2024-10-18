import { faker } from '@faker-js/faker'
import { capitalize } from 'lodash'

// Number
let _randomId = 1001
export const randomId = () => _randomId++
export const randomInt = (min: number, max: number) => faker.number.int({ min, max })
export const randomFloat = (min: number, max: number) => faker.number.float({ min, max, precision: 0.01 })

// Boolean
export const randomBool = () => faker.datatype.boolean()
export const randomTrue = () => randomInt(1, 5) > 1 // 80% chance to be true
export const randomFalse = () => randomInt(1, 5) === 1 // 80% chance to be false

// Array
export const randomArray = (min: number, max?: number) => Array.from(Array(randomInt(min, max || min)))

// String
export const randomText = (words: number = 5) => capitalize(faker.lorem.words(words))
export const randomLongText = (sentences: number = 5) => capitalize(faker.lorem.sentences(sentences))

// Date
export const randomRecentDate = () => faker.date.recent().toISOString()

// Images
export const randomAvatar = () => faker.image.url({ width: 512, height: 512 }) + '.jpg'
export const randomImageHD = () => faker.image.url({ width: 1280, height: 720 }) + '.jpg'
export const randomImageFHD = () => faker.image.url({ width: 1920, height: 1080 }) + '.jpg'

// Names
export const randomFirstName = () => faker.person.firstName()
export const randomLastName = () => faker.person.lastName()
export const randomFullName = () => `${faker.person.firstName()} ${faker.person.lastName()}`
