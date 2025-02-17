function names(...args) {
    //...rgs are an indefinite arguments passed as an array
}

function say(a,b,c,d,...chars) {
    //...chars is an array holding all the remaining arguments after the first four arguments
}

//we can use a function to return the sum of only arguments passed as a number and ignore the non-numbers
function sum(...args) {
    //return args
    //return args.filter((elem)=> typeof(elem) === 'number')
    //reduce the array into a single value .reduce
    return args.filter((elem )=> typeof elem === 'number').reduce((prev, next)=> prev + next)
}
let result = sum(1,"pamela",90, undefined, null)
console.log(result)


//spread -- 
//... dots passed to an array mean creates a copy of that array: i.e a shallow copy f an array

const arr1 = ['a', 3, {name:"TheG", age: 45}]
const arr2 = [1, {isMale: true}]

const combinedArray = [...arr1,...arr2]
console.log(combinedArray)

//adding new elements to the combined array
const info = [...combinedArray, "43", {uni:"dekut", isStudent:"true"}]
console.log(info) //[
//     'a',
//     3,
//     { name: 'TheG', age: 45 },
//     1,
//     { isMale: true },
//     '43',
//     { uni: 'dekut', isStudent: 'true' }
//]

//Unique values for a key
const objStd1 =  { name: 'TheG', age: 45 }
const objStd2 = { uni: 'dekut', isStudent: 'true' }

const objStd3 = {...objStd1,...objStd2}
console.log(objStd3)


//Handling multiple values in a key
//If you want to store multiple values for a key, an array is a useful solution
let arr = new Array()
console.log(arr instanceof Array) //true

var obj = {
    keys: ['Value1', 'Value2']
}
for (let i in obj) {
    console.log(i)//key
    if (obj[i] instanceof Array) {
        for (let k = 0; k < obj[i].length; k++) {
            console.log(obj[i][k])
        }
    } else {
            console.log(obj[i])
        }
    }

