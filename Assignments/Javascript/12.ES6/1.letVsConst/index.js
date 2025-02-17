//let introduces block scoped variables....helps avoid issues with hositing and scoping
//let is reassignable
//block scope controls variable scope better than var
//limited within the block in which they are declared

// const also introduces block scoped variables only it cannot be reassigned

// function example() {
//     if (true) {
//         let x = 10
//     }
//     console.log(x) //ReferenceError: x is not defined -- its outside the scope {}
// }
// example()


//var --- its not block scoped.....can be accessed from anywhere outside the block
// function example() {
//     if (true) {
//         var x = 10
//     }
//     console.log(x) //10
// }
// example()

//const 
// function example() {
//     if (true) {
//         const x = 10
//     }
//     console.log(x) //ReferenceError: x is not defined
// }
// example()

//the var keyword on a function scope will always affect the global scope variable
//NET NINJA



