//Boolean is a true or false value

const isAdmin = true;
const isStudent = false;

//logical application of boolean
function showPaymentsModule(args) {
    //e.g for a react component
    if (args === true) {
        //show payment details
        console.log("Access Rights")
    } else {
        //show pageNotAuthorized
        console.log("No Access Rights")
    }
}

showPaymentsModule(isAdmin) //if admin access i s allowed
showPaymentsModule(isStudent)//if student not access allowed

//boolean should not be in quotes
console.log(typeof "true");

//boolean context
//logical and comparison operators
//== checks if the values are equal only
//===checks if values and type is equal
console.log("5" == 5); //true
console.log("5"=== 5); //false

//also be used to check inequality
// we use != or !==
//!= checks values 
//!== checks both values and type
console.log("6"!=6) //false
console.log("6"!==6) //true

//real world example of != comparison using passwords
import bcrypt from "bcrypt"

const password = 'Qweioplidn'
const hashedPassword = bcrypt.hashSync(password, 10)
console.log(hashedPassword)


//assuming you need to login to my app
//we need to compare the two passwords....user and hashed password
//we'll use bcrypt which is a javscript module
const comparedPasswords = bcrypt.compareSync(password, hashedPassword);
function authLogin(args) {
    //e.g for a react component
    if (comparedPasswords) {
        //show payment details
        console.log("login succesful")
    } else {
        //show pageNotAuthorized
        console.log("login failed")
    }
}
authLogin()


//&& keyword - checks if the left and right sides are true
//both sides should be true to evaluate to true

console.log(true && true) //true
console.log(true && false) //false
console.log(false && false) //false


