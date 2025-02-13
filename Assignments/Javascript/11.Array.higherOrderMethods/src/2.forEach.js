/* forEach -- executes a provided function once for each element in an array
--It iterates through each element in array and performs a function
--It is mutable - modifies the original array
--no return value/array

arrayName.forEach(callbackFn)

callbackFns 
(value) => {} //without return
(value) => {return value}  //with return
(value) => (value) with return directly
*/

let runners = ['Kiplimo', 'Kipkoech', 'Kiprotich']
runners.forEach((runner)=> {
    console.log(`${runner} runs 10km race`)
})

let sum  = 0;
let averageMark = 0;
let marks = [23,23,45,77,79]
const average = marks.forEach((mark)=>{
    sum += mark
    averageMark = sum/marks.length
})
console.log(averageMark)