//defining n object literal
{ }
const person = {
    name: "George",
    age: 30
}

//By default TS infers objects 
// const person: {
//     name:string;
//     age: number;
// }

//Explicit type annotation//Inline type
const person1: { name: string; age: number; } = {
    name: "George",
    age: 30
}

//Using type to Define Object Shapes --- allows reusing 
type Person = {
    name: string;
    age: number;
}

//lets reuse the object shape
const Alice: Person = {
    name: "Alice",
    age: 20
}

//Passing Optional Properties using ? operator
type OptionalPerson = {
    userName: string;
    userAge?: number;
}

//lets reuse the object shape
const Green: OptionalPerson = {
    userName: "Alice"
}

//Intersection of Types
//They allow you to combine multiple types into one. This is useful when you want to create a new type that has all the properties of the combined types
type IntersectedTypes = OptionalPerson & Person

const intersectedPerson: IntersectedTypes = {
    name: "The G",
    userName: "G",
    age: 20
}

//Interfaces are other ways of constructing objects: The are similar to types but they have more capabilities like extendung from other interfaces
//syntax -- no equal sign in interfaces

interface Animal {
    name: string;
    age: number;
}
//You can redeclare Interface but you cant redeclare type

interface Animal {
    name: string;
    age: number;
}

//We can extend the properties of dan interface and use them in another interface
interface Dog extends Animal {
    breed: string;
}

const myDog: Dog = {
    name: "Rex",
    age: 2,
    breed: "German shepherd"
}

//You can even extend interfaces an use them in files needed

//Differences between types and interface
//You can extend Interface but Types can only be extended and the opposite is impossible
//You can redeclare Interface but you cant redeclare type

//create Objects from Dynamic Keys with index Signatures
//A key of an object is always a string and positioned at an index
//const syntax: {[key: string]: anyType}
const dynamicKeyShape: { [key: string]: string } = {}
dynamicKeyShape["name"] = "Alice"
dynamicKeyShape["age"] = "30"
console.log(dynamicKeyShape)

//Examples of dynamic keys with fixed properties
type User3 = {
    id: number;
    name: string;
    //this accepts a key of any name that can be either a string or a number
    [key: string]: string | number
}

//there will be no error if you dont pass in a dynamic key declared
//
// const user1 : User3 = {
//     id: 1,
//     name: "Th EGT"

// }
//console.log(user1) //{ id: 1, name: 'Th EGT' }
//the dynamic key value allows us to pass as many values as possible
const user1: User3 = {
    id: 1,
    name: "Th EGT",
    email: "theg@gmail.com",
    phone: 23
}
console.log(user1) //{ id: 1, name: 'Th EGT', email: 'theg@gmail.com', phone: 23 }

//6 -Utility types
//Typescript provides Utility functions to make it easier to work with typescript
//common utility -
//Partial<T> - makes all properties of a type optional
//Required<T> - makes all properties of a type required
//Pick<T> - creates a new types by picking a set of properties from existing types
//Omit<T> - creates a new types by omitting a set of properties from existing types

type Person4 = {
    name: string;
    age: number;
    location: string;
}

type PartialPerson = Partial<Person4>

//By ommiting the required propeties the object did not error

const partialPerson: PartialPerson = {
    name: "The G"
}

type RequiredPerson = Required<Person4>

//By ommiting the required propeties the object will show an error
//error- //Type '{ name: string; }' is missing the following properties from type 'Required<Person4>': age, locationts(2739)
// const requiredPerson: RequiredPerson = {
//     name: "The G"
// }


//Pick 
type Person5 = {
    name: string;
    age: number;
    location: string;
}

//pick the name and age from person 5
type PickNameAndAge = Pick<Person5, "name" | "age">
//you can also do this by ommitting location
type OmitLocationNameAndAge = Omit<Person5, "location">

const nameAndAge: PickNameAndAge = {
    name: "Alice",
    age: 30
}

const ommittedLocation: OmitLocationNameAndAge = {
    name: "Alice",
    age: 30
}

//We can combine known and dynamic keys with intersection


//Declaration merging
// allows extension of an interface by declaring it multiple times

interface Person3 {
    name: string
}
interface Person3 {
    age: number
}

const person3: Person3 = {
    name: "George",
    age: 30
}


//Type assertion and casting
//You can explicitly tell typescript the type of an object using type assertions
const somevalues: unknown = "Hello Typescript"
const strLength: number = (somevalues as string).length
console.log(strLength)


const myName = {
    name: "HH"
}

const fullName = { name: "The G" } as { name: string }
console.log(fullName)







