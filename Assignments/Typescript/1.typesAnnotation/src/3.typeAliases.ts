//Defining Types and reusable
type Animal = {
    name?: string;
    type?: string;
    age?: number;
}

//we can add it as a type annotation to a new variable
let cow : Animal = {
    name: "cow",
    type: "mammal",
    age: 12
}

//lets reuse it
let cat : Animal = {
    name: "cat",
    type: "mammal",
    age: 20
}

//we can also use the type aliases in functions for reusability
const getAnimalDescription = (animal: Animal) => {
    return animal
}
console.log(getAnimalDescription(cat))

//type aliases as basic types
type id = string | number 
let userId:id = 3454234
userId = '234567'
console.log(userId)

//sharing types across modules
// export type student = {
//     name: string;
//     age: number;
// }

//to import it in the file needed
import { student } from './1.basicTypes'

const jabal: student = {
    name: "Jabla",
    age: 39
}
console.log(jabal)

//
type shape = {
    width: number;
    height: number;
}

const getRectangleArea = (rectangle: shape)=>{
    return rectangle.width * rectangle.height
}

const getRectanglePerimeter = (rectangle: shape)=>{
    return 2* (rectangle.width + rectangle.height)
}
const rectangle = {height: 23, width: 12}
console.log(getRectangleArea(rectangle))
console.log(getRectanglePerimeter(rectangle))


