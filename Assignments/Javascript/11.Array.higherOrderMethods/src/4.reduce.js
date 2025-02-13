/* .reduce()-used to apply a function to each element of an array,
reducing the array to a single value.
--particularly useful for accumulating results, 
performing calculations or combining data from an array into a single output*/

const marks = [23, 34, 45, 56, 77];
let total = 0;
const singleMarks = marks.reduce((prev, total) => {
  return (total += prev);
});

console.log(singleMarks);

const availableFoods = [
    {id: "QWERTGRK59", name : "Burger", image : "🍔🍔", price: 234},
    {id: "QWERTGRK49", name : "Pizza", image : "", price: 400},
    {id: "QWERTGRK69", name : "Fries", image : "", price: 500},
    {id: "QWERTGRK97", name : "Chicken", image : "", price: 1200},
]

console.log(availableFoods.map((foodObj)=>foodObj.price).reduce((prev, next)=>prev  + next));