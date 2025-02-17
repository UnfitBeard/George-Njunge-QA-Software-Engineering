const fname = "The G"
const lName = "Tman"

console.log(`My name is ${fname} ${lName} and am ${2025-2004} years old`)


//template literals automatically enable multi-strings

const message = `
I have it
but you dont`
console.log(message)

//allows for dyanmic string creation
const price = 19.59
const discount = 0.2

const finalPrice  = `final price after discount is ${price-(price * discount)}`
console.log(finalPrice)

//template literals can be used in html
//Also used for conditional expressions that we did in first week