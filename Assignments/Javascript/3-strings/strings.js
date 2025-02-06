import chalk from "chalk";
let myName = ""//empty string
let myBook = "Intro to JS";
let statement = `I love to type`;
let laptopType = "lenovo";


//String properties
//1-length-----returns no of chars ina string
console.log(myBook.length)//

//charAt() --charcter ast specified index
console.log(myBook.charAt(1));

//concat
console.log(myBook.concat(statement))
console.log(myBook.concat(' '+statement))// adding space between the two strings
console.log(myBook.concat(` Is interesting`));
console.log(myBook.concat(' '+"Is interesting"));
console.log(myBook.concat(` ${statement}`));//using template literals //es6

//indexOf - returns index of the first occurence of a specified value of a string
//I am a student
//0123456789.......
const lname = "Stephen Curry"
console.log(lname.indexOf("r"))

//includes - returns true if a string contains a specified value
console.log(lname.includes("curry"));
console.log(lname.includes("Curry"));

//toLowerCase() -- converts a string to lower case letters
const animal = "ELEPHANT";
console.log(animal.toLowerCase())

//toUpperCase() --converts to upperCase
console.log(lname.toUpperCase())

//split -- splits a string into an array of strings by separating the strings into sub arrays
console.log("George".split(" ")) // [ 'George' ]
console.log("George".split()) // [ 'George' ]
console.log("George".split(""))//[ 'G', 'e', 'o', 'r', 'g', 'e' ]

//substrings --extracts chars from a string between two specified indices
//substring(startingIndex, endingIndex -1)
let sentence = "I am a student"
console.log(sentence.substring(7, 11)) //stud

//substr() - extracts parts of a string
//beginning at the character at thes specified index
//and returns the specified number of characters
//substr(startingIndex, numberOfCharacters)
console.log(sentence.substr(7, 4)) //from sevventh index return four characters


let sentence1 = "Hellow my name is Luna"
console.log(sentence1.substr(2, 5)) //from second characters form second character

//trim - removes white spaces form both ends of a string
let sent = "         I am available    ";
console.log(chalk.bgBlue(sent))
console.log(chalk.bgBlue(sent.trim()))

//trim start-----remove whitespaces on the start
console.log(chalk.bgBlue(sent.trimStart()))
console.log(chalk.bgRed(sent.trimEnd()))
console.log(sent.trimStart())










