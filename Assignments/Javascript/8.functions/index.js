//block of code that executes a certain functionality...eg fetching data from an online API, calculating Average, multiplication etc
//function keyword is used to create or define a function
//A function must have ()
//two types of functions ---
//normal function
function myFunction() {}

//arrow function
const myFuction2 = () => {}


//inside the parenthesis you put your code to be executed based on functionality

// import salesData from './data.json'
// function fetchSales() {
//     //logic
//     console.log(salesData)
// }

//each execution occurs in LIFO
//fetchSales()
//return keyword is used to return the value needed by that function


//function can also contain an argument
//whats an argument --- representation of a datatype supposed to be passed as an input later when function is called.
//argument passed can be of any type
function myGoodFn(data) {
    return data;
}
//if you return inside the function to print you need to put the return keyword
console.log(myGoodFn({name:'Gtheman'}))

//most of the time the argument is used for manipulation e,g looping through it, calculating it with something else
function average(marks) {
    let total = 0;
    for (let num of marks) {
        total += num
        num++
    }
    return `total is ${total} and average is ${total/marks.length}`
    //get total and then get average which is toatl/n
}
console.log(average([123, 45, 678, 798])) 

//adding a return type to arrow fuction 
const circleArea = (radius) => `The area of a circle is: ${Math.PI * radius**2}`
console.log(circleArea(7))
//OR
//
const circleArea1 = (radius) => {
    return `The area of a circle is: ${Math.PI * radius**2}`
}
console.log(circleArea1(7))
//sometimes arrow fuctions return immediately and dont need return keyword.....
//(()=> {}).....immediately invoked function
//(function fnName() {})//imediately invoked normal function

