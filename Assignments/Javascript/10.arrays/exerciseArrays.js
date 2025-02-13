//Question 1
//Creating arrays
let arr = []
let arr2 = new Array()

//Question 2 -- access
let arr3 = [1, 2, 3, 4];
let firstElement = arr3[0]; // 1
let lastElement = arr3[arr.length - 1]; // 4

//Question 4
let arr4 = [1, 2, 3];
arr4.push(4);
console.log(arr4); // [1, 2, 3, 4]

//Question 5
let arr5= [1, 2, 3];
for (let i = 0; i < arr5.length; i++) {
console.log(arr5[i]);
}

//method 2
arr5.forEach(num => {
    console.log(num)
})

//Question 6
//Existence of an element
if (arr5.indexOf(2)!==1) {
    console.log(`element found`)
} else {
    console.log(`element not found`)
}

//Question 7
//Removing an element at a specific index
console.log(arr5.splice(1))

//Question 8
//Concatenating two arrays
let arr8 = [1, 2]
let arr8_2 = [3, 4]
console.log(arr8.concat(arr8_2))


//FLATTEN ARRAY JAVSACRIPT QUESTIONS
//Question 9
const array9 = [
    1,2,4,[
        6,7,8,9
    ]
]

function flattenArray(arr){
    return arr.reduce(function(flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
        }, []);
}


//Question 2: 
// The reduce() method in JavaScript takes an array and applies a function to each element,
// accumulating the result into a single value. In the flattenArray() function above, the reduce() method
// is used to concatenate the current element (either a flattened sub-array or a non-array value) to the
// flattened array so far.

//Question 3
console.log(flattenArray(array9))

//Question 4
// The flat() method is a built-in method in JavaScript that can be used to flatten an array. It
// takes a depth parameter, which specifies how many levels of nested arrays should be flattened. If no
// depth parameter is provided, it defaults to 1. Here's an example usage:


//Javascript Array Manipulation Interview Questions with answers

// Question 1: difference between .map() and .forEach()?
// .map() and .forEach() are both array methods that allow you to loop through an array, but they differ
// in what they return.
// .map() returns a new array with the same length as the original array, where each
// element is the result of applying a callback function to the original element.
// .forEach() does not return anything, but it simply executes a callback function on each
// element of the array.
// Example:
const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map(num => num * 2);
console.log(doubledNumbers); // [2, 4, 6, 8, 10]
numbers.forEach(num => console.log(num * 2)); // 2, 4, 6, 8, 10

//Question 2
//Removing an element from an array
// You can remove an element from an array using the .splice() method. This method modifies
// the original array by removing or replacing existing elements and/or adding new elements.
const fruits = ['apple', 'banana', 'orange', 'mango'];
fruits.splice(2, 2);
console.log(fruits); // ['apple', 'banana']
// In this example, we use the .splice() method to remove the third element (index 2) and the fourth element (index 3) in the fruits array.

//QUESTION 3-- difference between .filter() and .find()
// filter return a new array with elements that pass a certain test
// find return the first value that meets a certain conditions

const _numbers = [1, 2, 3, 4, 5];
console.log(_numbers.filter(num=>num>2))
//returns an array of values that are greater than 2

console.log(_numbers.find(num=>num%2==0))
//returns the first number that is even

//QUESTION 4 -- sort an array in Javascript
console.log(_numbers.sort()) //returns a sorted array 

//QUESTION 5
//Flattening a nested array
const numbers_ = [1, 2, [3, 4], [5, [6, 7]]];
console.log(numbers_.flat(2))


//How to get the first three elements of an array in JS
console.log(numbers_.slice(0, 3));

//What is Array[-1] --- used to accces the last element of the array
//--negative index values count from backwards

