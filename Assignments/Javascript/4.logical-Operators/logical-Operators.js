//Double equal sign used to test for equality
//can also use == & ===
console.log("12345" == 12345);

let result = "2" || "3" || "Alamin";
if (result == "2" || result == "3" || result == "Alamin") {
  console.log("available");
} else {
  console.log("Unavailable");
}

//Logical &&-return true if both operand is true
//both sides should be true to evaluate to true

console.log(true && true); //true
console.log(true && false); //false
console.log(false && false); //false

let a = 5,
  b = 10;
console.log(a < b && b > a);//true
console.log(a < b && b > a);//false

let user = {
    isLoggedIn : true,
    hasPermissions: true
}
//to view bank balance one needs to be logged in and have permissions
if (user.isLoggedIn && user.hasPermissions ) {
    console.log("View your bank balance")
}

//reason why an array is an object
console.log(typeof [1, 2, 3, 5])//object
//has keys and values
//the keys are actually infered as indices

//the logical || operator returns true if only one side is true
//Only when all sides are false it will result to false
console.log(a < b || b > a);//true
console.log(a < b || b < a);//true
console.log(a > b || b < a);//false

//Logical Not ! - checks the opposite of the equation
console.log(!true)//false
console.log(!false) //true

let isActive = false;
if (!isActive) {
    console.log("System is not active")
} else {
    console.log("The system is active")
}

//logical Assignment Operators
//Order of precedence
//Logical NOT, logical AND &&, logical OR ||

let _a = true
let _b = false 
let _result = !_a && (_b || true);  //!a evaluates first
console.log(_result)

