//filter - creates a new array element with all elements that pass the test
//must have a return keyword ro return immediately (() {})

/* arrayName.filter((value, index, array)=> {
    //function body
    });

    array.filter(callbackFn, thisArg)

    */

    //Return new array
    //Requires return = opting the return will lead to an empty array
    //immutability


const availableFoods = [
    {id: "QWERTGRK59", name : "Burger", image : "🍔🍔", price: 234},
    {id: "QWERTGRK49", name : "Pizza", image : "", price: 400},
    {id: "QWERTGRK69", name : "Fries", image : "", price: 500},
    {id: "QWERTGRK97", name : "Chicken", image : "", price: 1200},
]

const food = availableFoods.filter((food)=> food)
console.log(food)
const filteredFood = availableFoods.filter(filteredFood => filteredFood.price > 450)
console.log(filteredFood)
