//increment and decrement operators
//++ -adds one to thr value
// -- -removes one from the value

//post increment
let salary = 90000
console.log(salary++)//90000;
console.log(salary)

//pre -increment
let salary1 = 90000
console.log(++salary1) //90000
console.log(salary1) //900001

const marks = [56,45,67,87]

for (let i = 0;i < marks.length;i++) {
    console.log(`${marks.indexOf(marks[i])} : ${marks[i]}`)
    if (i === marks.indexOf(marks[i])) {
        console.log(true)
    }else {
        console.log("stopping")
    }
}

//pre decrement
let num3 = 9
console.log(--num3);

//post decrement
let num4 = 9
console.log(num4--);
console.log(num4)

//greater than or less than
console.log(10 <= 11);
console.log(10 > 11);


//Math objects
console.log(typeof Math)
//Math is an object in js

//Math.PI
let radius = 7
console.log(Math.PI * radius**2)
//Math.sqrt
console.log(Math.sqrt(radius))

let numbers = [1,2,3,4,5,6,7]

//Math.max
console.log("Maximum number is",Math.max(...numbers))

//Math.min
console.log("Minimum number is", Math.min(...numbers));

//random --random number between 0 and 1
const result = Math.random()*100
//floor ---largest integer less than or equal to the input
console.log(Math.floor(result))

//ceil --largest number greater than or equal to input
console.log(Math.ceil(result))

//round
console.log(Math.round(result))

//uuid is used to generate ids for users in apps
import { v4 as uuidv4 } from 'uuid';
console.log(v4()) //f5295e20-f7a2-44dd-adda-b2bc50cd8c7a



