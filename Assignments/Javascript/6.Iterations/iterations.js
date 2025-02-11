//loops in js can be done using four loops
//while loop
//do...while
//for loop
//for...of loop
//for...in loop

//The while loop -- executes a block of code as long as condition is true
let x = 0
while (x < 10) {
    console.log(x);
    x++;
}
console.log("Program has stopped")

//The do...while loop....gaurantees execution of code before its tested
do {
    console.log(x)
    x++
} while (x<20) {
    console.log("Am done")
}

//for loop ---easy

//for....of loop
let numArr = [1,2,3,4,5,6,7,8]
for (let no of numArr) {
    console.log(`${no}`)
}

//for in
let numObj = {
    name:"George",
    height:5.11
}

for (const nums in numObj) {
    console.log(`${name}`)
    }