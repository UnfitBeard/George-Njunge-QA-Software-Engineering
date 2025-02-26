"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStrings = exports.addNos = void 0;
//basic Variable annotation 
let name1 = "Julia";
//hovering over name let name1: string
//lets annotate it
let name2 = 'Julia';
console.log(name2); //Julia
//1.function parameter annotation
const logAlbumInfo = (title, trackCount, isReleased) => {
    //string
}; //const logAlbumInfo: (title: string, trackCount: number, isReleased: boolean) => void
//logAlbumInfo("Black Gold", 23, {}) //logAlbumInfo(title: string, trackCount: number, isReleased: boolean): void
//we can change the return type of a function by specifying the type
function add(x, y) {
    return x + y;
}
//add("Julia", 67) //Argument of type 'string' is not assignable to parameter of type 'number'
//how do you annotate variables
//types we learnt
let car = "ferrari";
let carTyres = 5;
let isComing = true;
let example4 = Symbol();
//let example5: bigint= 123n;
let example6 = null;
let example7 = undefined;
//Typescript Inference
let marks = [1, 2, 3, 4];
// automatically we didnt need to annotate an array of numbers but we did it.....ts automatically infered it
let myName = ["Jonathan", "Ndambuki"];
//myName.push(3)//Argument of type 'number' is not assignable to parameter of type 'string'.
//function parameters must be passedd with their annotations
// function myInfo(name ,age) {
// }
//not adding types on a fucntion will bring an error 
function myInfo(name, age) {
}
let a;
a = "Lion";
console.log(a); //Lion
a = 56;
console.log(a); //56
//console.log(a.g.h) //typescript not warning on IDE but brings error during runtime
//avoid type any
//exercises
//we cant combine two booleans
const addNos = (a, b) => {
    return a + b;
};
exports.addNos = addNos;
const addStrings = (a, b) => {
    return a + b;
};
exports.addStrings = addStrings;
const concatTwoStrings = (a, b) => {
    return [a, b].join(" ");
};
concatTwoStrings("Hello", "world");
const concatTwoStrings1 = (a, b) => {
    return [a.join(" "), b].join(" ");
};
concatTwoStrings1(["Hello", "world"], "Kenya");
const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    return value;
};
