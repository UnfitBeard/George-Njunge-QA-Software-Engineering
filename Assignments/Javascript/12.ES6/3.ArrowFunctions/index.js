//trad fn
function areaSquare(n) {
   return n * n  
}
console.log(areaSquare(7))

//Arrow fn
// const fnName = () => {return } //pass in return keyword
// const _fnName = () => () //immediate return

const doubleArrowFn = (n) => {
    return n * n
}

const doubleArrowImmediateFn = (n) => (n * n)

//parameters in functions
const areaOfSquare = n => n * n
console.log(areaOfSquare(4))


const add = (a, b) => a + b //...multiple parametres should be put inside parenthesis ()
console.log(add(5, 10));

//how do trad and const handle this keyword
//traditional function
// let myVar = 0;
// function myFunction(myVar) {
//     this.myVar = 2;
//     setTimeout(() => {
//         this.myVar++
//         console.log(this.myVar)
//     }, 0)
// }

// console.log(myFunction(6))

//arrow function with this keyword
class Counter {
    constructor() {
        this.count = 0
    }

    increment() {
        setTimeout(() => {
            this.count++
            console.log(this.count)
        }, 1000);
    }
}

const counter = new Counter()
counter.increment() //1
