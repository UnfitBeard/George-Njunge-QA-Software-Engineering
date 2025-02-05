let name; //reassigned
const marks = 4000; //constant
var students = []; //old school

//naming Conventions
//use camelCase
let isLoggedIn = true;

//start with letter underscore dollarsign
//const #dollar = 250;.......erroneous
let $dollars = 234;
let _dollars = 234;
let dollars = 234;
let $dollarsInUsd = 700;

//descriptive but not verbose
let myMumIsaGoodCook = true;//verbose
let mumDish = true;

//data types
//numbers...integers, doubles, Big ints
console.log("I am an integer", 4);
console.log("I am a double", 4.25);
//Big ints for numbers greater than 2^53 -1
//add an n after a big number
const elonsWealth = 15000000000000000000n;

//strings texts inside quotes '' or ""
console.log("my name is a String");

//type of an object
console.log(typeof(45));
console.log(typeof('45'))


//booleans----has only true or false
const isAuthenticated = true;
const isAdmin = true;

// isAuthenticated ? <ShowProfile/> : <ShowAuthPage/>;

let studentAge;
console.log(studentAge)//undefined

//data is empty returns null
const noData = {studentAge:null}
console.log(noData.studentAge)

//objects
// {} empty object
let myData = {}
console.log(myData)
//add data to an object use .notation
myData.name = "Gth"
myData.university = "Sultan Caboos"
console.log(myData)
console.log("my data is ", typeof(myData));

//array
//[] empty array
let isMarried = false;
const info = [
    'George Njunge',
    22,
    "Dekut",
    { id: 12345, nationality: "Kenyan"},
    isMarried
]

console.log(info)
console.log("info is of type ", typeof(info))

//type coercion
console.log(5 + "3");//53....string concatenation
console.log("5" + 3);//53....string concatenation
console.log("5" - 3);//2 (numeric subtraction)

console.log(typeof("5" - 3));

//conversions
//to string -----number.toString()
//to number------parseInt("45")




