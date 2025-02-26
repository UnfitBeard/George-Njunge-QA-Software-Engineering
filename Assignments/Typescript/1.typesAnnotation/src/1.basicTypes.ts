//basic Variable annotation 
let name1 = "Julia"

//hovering over name let name1: string

//lets annotate it
let name2 : string = 'Julia'
console.log(name2) //Julia

//1.function parameter annotation
const logAlbumInfo = (title:string, trackCount:number, isReleased:boolean) => {
    //string
} //const logAlbumInfo: (title: string, trackCount: number, isReleased: boolean) => void

//logAlbumInfo("Black Gold", 23, {}) //logAlbumInfo(title: string, trackCount: number, isReleased: boolean): void
//we can change the return type of a function by specifying the type
function add(x:number, y: number): number {
    return x + y
} 

//add("Julia", 67) //Argument of type 'string' is not assignable to parameter of type 'number'


//how do you annotate variables
//types we learnt
let car:string = "ferrari"
let carTyres: number = 5
let isComing:boolean = true 
let example4: symbol= Symbol() 
//let example5: bigint= 123n;
let example6: null = null;
let example7: undefined = undefined;
 
//Typescript Inference
let marks = [1,2,3,4]
// automatically we didnt need to annotate an array of numbers but we did it.....ts automatically infered it
let myName :string[] = ["Jonathan","Ndambuki"]
//myName.push(3)//Argument of type 'number' is not assignable to parameter of type 'string'.
//function parameters must be passedd with their annotations
// function myInfo(name ,age) {
// }
//not adding types on a fucntion will bring an error 
function myInfo(name:string, age: number) {
    
}

let a:any
a="Lion"
console.log(a)//Lion
a = 56
console.log(a)//56

//console.log(a.g.h) //typescript not warning on IDE but brings error during runtime
//avoid type any

//exercises

//we cant combine two booleans
export const addNos = (a: number, b: number) => {
    return a + b;
}

export const addStrings = (a: string, b: string) => {
    return a + b;
}

const concatTwoStrings = (a :string, b: string) => {
    return [a, b].join(" ")
}

concatTwoStrings("Hello","world")

const concatTwoStrings1 = (a :string[], b: string) => {
    return [a.join(" "), b].join(" ")
}

concatTwoStrings1(["Hello","world"], "Kenya")

const handleSubmit = (e: any)=>{
    e.preventDefault()

    const data = new FormData(e.target)
    const value = Object.fromEntries(data.entries())
    return value
}

//Reusable types
export type student = {
    name: string;
    age: number;
}
