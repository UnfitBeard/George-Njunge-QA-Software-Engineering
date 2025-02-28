// interface infoTypes {
//     names: string[],
//     age: number,
//     areChamps: boolean
// }

// const info : infoTypes = {
//     names: ["AJ", "GN", "TS", "GG"],
//     age: 23,
//     areChamps: true
// }

// console.log(typeof info.names)
//use curly braces


const talkToAnimal = (info: { name: string[], type: string, age: number }) => {
    //rest of the function
}

type animal = {
    name: string,
    animalType: string,
    age: number
}

const talkToAnimal1 = (animalObject: animal) => {

}


const cow = {
    name: "cow",
    type: "Mammal",
    age: 20
}

const talkToAnimal2 = (info: { name: string, type: string, age: number }) => {
    console.log(typeof info.age)
}
talkToAnimal2(cow)
//we can use ? operator to mark sth as optional
//lets make age optional
const cow1 = {
    name: "cow",
    type: "Mammal",
}
const talkToAnimal3 = (info: { name: string, type: string, age?: number }) => {
    console.log(info.name, info.type)
}
talkToAnimal3(cow1)

//creating an object Type
type userTypes = {
    first: string;
    last: string;
}

const concatName = (user: userTypes) => {
    return `${user.first} ${user.last}`
}
const userObj = {first:"George", last:"Njunge"}
console.log(concatName(userObj)) 
