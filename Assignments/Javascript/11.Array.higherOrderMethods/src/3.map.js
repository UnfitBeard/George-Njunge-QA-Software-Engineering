/* .map() return a  new array
-- immutable -- doesnt retunr a new array
*/
let runners = ['Kiplimo', 'Kipkoech', 'Kiprotich']
const newRunners = runners.map((runner)=> {
    return `${runner} runs 10km race`
})
console.log(newRunners)

const availableFoods = [
    {id: "QWERTGRK59", name : "Burger", image : "🍔🍔", price: 234},
    {id: "QWERTGRK49", name : "Pizza", image : "", price: 400},
    {id: "QWERTGRK69", name : "Fries", image : "", price: 500},
    {id: "QWERTGRK97", name : "Chicken", image : "", price: 1200},
]

const newFoodsArray = availableFoods.map(foodObj => {
    return foodObj
})
console.log(newFoodsArray) //returns a new Array containing all foods
//lets say there is a price hike of 50
let newPrice = availableFoods.map(foodObj => foodObj.price + 50)
console.log(newPrice)

