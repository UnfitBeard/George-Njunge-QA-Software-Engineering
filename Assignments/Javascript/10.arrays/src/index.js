//Array - used to store and manipulate ordered collections of values
const name = 'George' //single string value
const number = 56   //single number value
const myInfo = {
    name: "The G2",
    id: "1278492304",
    county : "Nyeri"
} //a single object value
const info = [name, number, myInfo ] //a collection of different values
console.log(info) //[ 'George', 56, { name: 'The G2', id: '1278492304', county: 'Nyeri' } ]


//accessing array indices -- arrayName[Index]
const mark = [12,13,14,15,16]
//      1  2  3  4  5.....
//     -5 -4 -3 -2 -1  reverse index

//access modifiers in array
//arrayName[indexPosition] -- passing by reference
console.log(mark[0])

//if we try to reassign the value it results into an error
//const fname ="The G"
//fname = 'The M'
const fullName = ['Ali', 'Green']
console.log(fullName[0])
fullName[0]= 'The G'
console.log(fullName[0])

//modifications in array
//arrayName[i] = newValue

const marks = [23,45,67,78]
//changing the marks at index 2 to 56
let marksAtIndex2 = marks[2] //67
marksAtIndex2 = 53
console.log(marksAtIndex2) //53


//adding elements to the array
//1- .push --- adds elements to the end of the array

let _myInfo = []
_myInfo.push(23)
console.log(`Dennis Info: ${_myInfo}`)
_myInfo.push({
    id: 242657, country: "Kenya"
})
console.log(_myInfo) //[ 23, { id: 242657, country: 'Kenya' } ]

//removing elements from an array 
//(.pop) removes the last element

console.log(_myInfo.pop())

//.shift ---removing the first element of an array
console.log(_myInfo.shift())

//indexOf()  --used to get the position of a particular value
const _myCow = ['Friesian', 'Brown', 150000]
//indexOf() --- expects you to pass an index ..... an empty index you get a flag of -1
console.log(_myCow.indexOf()) // -1 Unavailable
console.log(_myCow.indexOf("Friesian")) // 0
console.log(_myCow.indexOf(150)) // 2


//combining arrays .....how do you do it
//concat 
const theG = ['Mark', 2384]
const theS = ["Stanely", 1673123]
const combinedArray = theG.concat(theS)
console.log(combinedArray) //[ 'Mark', 2384, 'Stanely', 1673123 ]

//joining array elements into one string use join()
const months = ['Jan', 'Feb', 'March', 'April']
//join array elements with optional operators
console.log(months.join()) //Jan,Feb,March,April

//adding unspaced '' on the join
//removes the commas
console.log(months.join(''))

//adding spaced ' ' on the join
console.log(months.join(' '))

//precedence
//this trick finds palindrome
console.log('Cow'.split('').reverse().join(''))
console.log('dad' == 'dad'.split('').reverse().join('')) //true

//.reverse ---- reverses the array elements
//.splice ---- used to remove, replace or add elements ina array
//format = arrayName.splice(index, numberOfItems, 'Value')
//add at index 1 the new value and push the one at index 2
const bro = ['nobody' ,'somebody', 'nobody']
bro.splice(1, 0, 'Theirbody')
console.log(bro) //[ 'nobody', 'Theirbody', 'somebody', 'nobody' ]


//replace at index 1 the value with the new one 
const bro2 = ['nobody' ,'somebody', 'nobody']
bro2.splice(1, 1, 'Theirbody')
console.log(bro2) //[ 'nobody', 'Theirbody', 'nobody' ]

//replace 2 values at index 1
const bro3 = ['nobody' ,'somebody', 'nobody']
bro3.splice(1, 2, 'Brobody')
console.log(bro3) //[ 'nobody', 'Brobody' ]

const bro4 = ['nobody' ,'somebody', 'nobody']
console.log(bro4.splice(1)) //removes the first item


//.slice() -- used to create a shallow copy of a portion of an array
//return an array from the startingIndex to the indexProvided -1
const bro5 = ['nobody' ,'somebody', 'nobody']
console.log(bro5.slice(1, 2)) //[ 'somebody' ]

//.includes -- check if an array contains a specific value
console.log(bro5.includes('somebody')) //true











