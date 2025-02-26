//function types
//when passing functions its very importatnt to pass their types
//basic function type def
//type functionName = (args: typesOfArgs) => return Type or void
type Mapper = (item: string) => number //takes a string item and returns a number

//using the mapper function type
const mapOverItems = (items: string[], map: Mapper) => {
    return items.map(map)
}

//You can define the function type inline
const mapOverItems1 = (items: string[], map: (item: string) => number) => {
    return items.map(map)
}

//how can you use a function that takes another function as a parameter
const arrayOfItems = mapOverItems1(['1', '2'], (item) => Number(item))
console.log(arrayOfItems)

//Function parametres variations
//functions in typescript can have different parametres configuration
//1--optional parametres
type WithOptionals = (index?: number) => number

//2-pasing Rest parameters
type WithRest = (...args: string[]) => number

//3--passing with multiple parametres
type withMultipleParams = (first: string, second: string) => number

//Return Type //const functionName=(args): returnType => {}
type User = {
    username: string;
    password: string;
}
const loggedInfo = (user: User): number => {
    return 123
}

//Asynchronous function in ts
//For asynchronous functions the return type should be a promise
type User1 = {
    username: string;
    authStatus: string;
}
const getUser = async (id: string):Promise<User1> => { 
    const response: Response = await fetch('www.todos.com/api')
    const jsonData = response.json()
    return jsonData
}

//passing generic types to functions
function processItems<T>(items: T[], processor: (item: T)=>void): void {
    items.forEach(processor)
}

processItems([1,2,4,5,5], (item)=>console.log(item*1))
processItems(['a','b'], (item)=>console.log(item.toUpperCase()))

//Practical Examples
const data: Array<number> = [1,2,3]
data.map((item)=>item*2)
