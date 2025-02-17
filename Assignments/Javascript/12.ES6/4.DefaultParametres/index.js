//In es6 its possible to assign default values in the function declarations
function say(message = 'hi') {
    console.log(message)
}
say()
say('Hello')
//default parameter is a fallback when a parameter was not provided


//single parameterwith default functions
function sum(numA, numB = 5) {
    console.log(numA + numB)
} 
sum(10)  //15
sum(5, 15)  //20

//providing a parameter value will override the default parameter

function greet(greeting = "Hello", name = "World") {
    console.log(`${greeting} ${name}`)
}
greet() //Hello , World
greet('Hi') //Hi World
greet('Hi', 'George')//Hi George

const sayHi = (greet = 'Hi', message = "Val") => {
    console.log(greet, message)
}
sayHi() //Hi Val
sayHi('Hello') //Hello Val






