import { faker } from '@faker-js/faker'

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
export const randomText = (sentences: number = 1) => faker.lorem.sentence(sentences)

// Date
export const randomRecentDate = () => faker.date.recent().toISOString()
