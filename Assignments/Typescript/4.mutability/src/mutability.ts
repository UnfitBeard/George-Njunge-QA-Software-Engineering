//state is immutable
let isAdmin = true
isAdmin = false//you mutated isAdmin

// (prevState) => (newState)
//  prevState != newState

//ability of a value to be changed after being created

//primitives types are immutable -- you cant change them once created
//i.e string, number, booelan, null, undefined, symbol are immutable

let str = "Hello"
str.toUpperCase()
console.log(str.toUpperCase()) //HELLO
console.log(str) //Hello

//Objects and Arrays are mutable
const arr: number[] = [1, 2, 3, 4, 5]
arr.push(6)
console.log(arr)//[1, 2, 3, 4, 5, 6]

const obj = { name: "alice", age: 30 }
obj.age = 90
console.log(obj) //{ name: 'alice', age: 90 }

//How do you make objects immuttable
//Typescript has the utiltity Readonly<T>
type UserType = {
    readonly name: string;
    age: number
}

const user: UserType = { name: "Hon", age: 25 }
//can we change the name value: no because its a readonly property
//we can change age as it is not read-only

const readOnlyObj: Readonly<UserType> = { name: "John", age: 29 }
//readOnlyObj.age = 35 //Cannot assign to 'age' because it is a read-only property.
//readOnlyObj.name = "Jane" //Cannot assign to 'age' because it is a read-only property.

//How to pass types to functions 
//basic way
function greet(name: string): string {
    return `Hello ${name}`
}

console.log(greet("The G")) //Hello The G

//generics in functions 
//type of a generic is unknown until defined
//allow functions to receive different types while preserving type safety
// function funcName<T>(args: T) {}
function identity<T>(value: T): T {
    return value
}
console.log(identity<string>("Hello")) //Hello
console.log(identity<number>(50)) //50
//console.log(identity<{name :string; age: number}>(name:"Jane", age: 50)) 
function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 }
}
console.log(merge({ age: 60 }, { name: "Green" })) //{ age: 60, name: 'Green' }

//Arrays in typescript
//const arrayName: type[] = []
//const arrayName: Array<type> = []
const fruits: Array<string> = ["Apple", "banana", "cherry"]
const studentMarks: number[] = [1, 2, 3, 4, 4, 5]

//Promises in typescript
type productData = {
    pid: string;
    PName: string;
    isAdmin: boolean
}
const prodData: productData = {
    pid: "12ed",
    PName: "Orange",
    isAdmin: false
}

const fetchData = async (): Promise<productData> => {
    //const res = await fetch(apiURL)
    const data = await prodData
    //return type determined by how data looks in backend
    //for an array of objects
    //const fetchData()=>async():Promise<userType[]> => {}
    return data
}

fetchData().then((user) => {
    console.log(user)
}).catch((err) => {

});

//{ pid: '12ed', PName: 'Orange', isAdmin: false }

//fetching an array of data from a restful array of data
//const arrayDataObj: Array<userTypes> = []

//sets in typescript
//set is a collection of unique values
//in TS its typed using Set<Type>

const mySet: Set<number> = new Set([1, 2, 3, 4, 5, 6])
mySet.add(6)
console.log(mySet) //{ pid: '12ed', PName: 'Orange', isAdmin: false }

//creating an empty set with specific types
const emptySet = new Set<string>()
emptySet.add("Hello")
console.log(emptySet) //Set(1) { 'Hello' }
//A set ensures uniqueness and optimized for quicker checks
console.log(emptySet.has("Hello"))//true

//Type assertions and casting
//Use as syntax
//Use angle brackets


//1.As syntax
const jsonString = `{"name": "George"}`
const parsedData = JSON.parse(jsonString) as { name: string }
console.log(parsedData)

//2. Using angle brackets
//not recommended in react


//Default params in TS
const greet2 = (name: string, greetings: string = "Hello") => {
    console.log(`${greetings} ${name}`)
}
//automatically making a parameter as a default will make it optional
//
greet2("Bob") //Hello Bob
greet2("Bella", "How are you") //How are you Bella

//rest parameters
const sum = (...numbers: number[]) => {
    return numbers.reduce((prev, next) => prev + next, 0)
}
console.log(sum(1, 2, 3, 4, 5, 6, 7))

//void keyword --- no return type
const logMsg = (message: string): void => {
    console.log(message)
}

//nothing is being returned