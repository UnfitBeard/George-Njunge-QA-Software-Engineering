//conditionals  are basically an if statemnet thta evaluates to true

let showering = true

if (showering) {
    console.log("Naah ")
}


//if condition was not satisfied there is a fallback with an else statement
let heShowered = false 
if (heShowered) {
    console.log("Naah")
} else {
    console.log("Aiight")
}


//in some situations you can have muktiple fallabcks
//else if, else if, else
let marks = 0
let grade = ""

function myGrade(marks) {
    if (marks > 89) {
        grade = "A"
    } else if(marks > 70) {
        grade = "B"
    } else if(marks > 50) {
        grade = "C"
    } else if(marks > 30) {
        grade = "D"
    } else {
        grade = "E"
    }
    return grade;
}

console.log(`Your Grade is : ${myGrade(78)}`)

//Later on ES6 syntax
const myGrade2 = (marks) => {
    return marks > 69 && marks <= 100? "A" : //Else if(s)
            marks >= 60? "B": //Else if(s)
            marks >= 50 ? "C": //Else if(s)
            marks >= 30? "D": //Else if(s)
            'Invalid input Marks' //else
}

console.log(`Your Grade is ${myGrade2(90)}`)
