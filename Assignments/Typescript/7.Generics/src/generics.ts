//Into to Generics -- allow creation of reusable components that work with variety of types rather than a single one

import { data } from "react-router-dom"

//They act as placeholders for types
function getFirstElement<T>(arr: T[]): T {
    return arr[0]
}
const numbers = [1, 2, 3]
const strings = ['apple', "mango"]
const firstNumber = getFirstElement(numbers)
console.log(firstNumber)
const firstString = getFirstElement(strings)
console.log(firstString)

//avoid defining two separate functions by creating a reusable component 
//Using generics with functions
//1. single generic parameter

function reverseArray<T>(arr: T[]) {
    return arr.reverse()
}

const numArray = [1, 2, 3, 4]
console.log(reverseArray(numArray)) //[ 4, 3, 2, 1 ]


//2. Multiple Generic parameters
function mergeObjects<T, U>(obj1: T, obj2: U) {
    return {...obj1, ...obj2}
}

const objA = {
    name: "The G",
    age: 34
}
const objB = {
    country: "Kenya",
    county: "Bomet"
}

console.log(mergeObjects(objA, objB)) //{ name: 'The G', age: 34, country: 'Kenya', county: 'Bomet' }


//Generic Constraints
//You can limit the types that can be passed as a generic parameter

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

const personObj = {
    name: "Geireg",
    age: 30
}

const nameStr = getProperty(personObj, "name")
console.log(nameStr) //Geireg

const ageNum =getProperty(personObj, "age")
console.log(ageNum) //30

//Default Types Generics
function createPair<T = string, U = number>(value1: T, value2: U) {
    return [value1, value2]
}
console.log(createPair("George", 30))//[ 'George', 30 ]

//the default parameters will be overwritten
console.log(createPair(100, false)) //[ 100, false ]

//Generics with interfaces and types
interface KeyValuePairs<K,V> {
    key: K;
    value: V
}
const numPairs: KeyValuePairs<string, number> = {
    key: 'id',
    value: 123
}

//Type Aliases in generics
type EmployeeType = {
    name: string;
    age: number
}

//we want to create a generic type
type Result<T> = {
    success: boolean;
    data: T;
    error?: string
}

const successResponse: Result<string> = {
    success: true,
    data: "SucessfulOps"
}

//Conditional Types with generics
type isString<T> = T extends string? 'yes': 'No'

function isAString<T> (value: T) {
    if (typeof value === 'string'){
        console.log('Yes')
    }else {
        console.log('No')
    }
}
const Result1 = isAString("Hello")




