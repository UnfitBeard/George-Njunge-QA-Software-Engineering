//4. Type Aliases with unions
type ID = string | number

const userID: ID = "user123svc"
const orderID: ID = 234


//5: Literal Types in unions
//Allows you to specify exact values of a type. Define a limited set of options
type Direction = "up" | "down" | "right" | "left"
function move(dir: Direction) {
    console.log(`Moving in ${dir}`)
}
move("up")

type MpesaState = "success" | "failed" | "pending"

function smsService(transState: MpesaState) {
    if (transState === "success") {
        //sendMessageSuccess()
    }
    if (transState === "pending") {
        //sendMessagePending()
    }
    if (transState === "failed") {
        //sendMessageFailed()
    }
}

//6.combine unions with unions
//You can combine multiple unions to create more complex types
type DigitalFormat = "MP3" | "FLAC"
type PhysicalFormat = "LP" | "CD" | "Cassette"
type AlbumFormat = DigitalFormat | PhysicalFormat


//Difference between Union and Intersection---research ..........



//7. Narrowing Union Types
//refining a union type to a more specific type
//Allows a type to be one of the several types

//typeof example
const printValue = (value: string | number) => {
    if (typeof value === "string") {
        console.log(value.toUpperCase())
    } else {
        console.log(value.toFixed(2))
    }
}

printValue("hello")
printValue(123.2456)

//8. Literal Narrowing
//Typescript narrows literalTypes within control flow
type Status = "success" | "failure"
const logStatus = (value: Status) => {
    if (value === "success") {
        console.log(value)
    } else {
        console.log(value)
    }
}

logStatus("failure")
logStatus("success")

//10. Unknown vs Never
let value1: unknown;
value1 = 10;
value1 = "qertyr"

const handleInput =(input: never)=>{
    // This function will never be called with a value
}

// TypeGuards
// narrow down a union to a more specific type
// enables type safety access to properties and methods that only belong to the narrowed type

//Custom typeGuards
// type Vehicle = {}
// const isCar = (vehicle: Vehicle): vehicle is Car => {
//     return vehicle.type === 'Car'
// }

// const 





