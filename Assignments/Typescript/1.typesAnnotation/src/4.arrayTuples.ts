//ways of  describing arrays
//let variableName: type[] = []....type can be any type e.g array, number etc
type Book = {
    title: string;
    author: string;
    price: number;
}
let books: Book[] = []


//array of strings
const myAlbums = ['Rubber Soul', 'Revolver']
let albums: string[] = []

//array of numbers
let marks: number[] = [1, 2, 3, 4, 5]

//second way is to explixitly use the Array keyword
//let variableName: Array<type>
let albumsArray: Array<Book> = [
    { title: "The G", author: "The G", price: 19.99 }
]

//Third way
//Array of Objects
let myAlbumsArray: Book[] = [
    { title: "The G", author: "The G", price: 19.99 }
]

//TUPLES
//tuples are unchangable data structure...
//..i.e an array of related types
//tuples are useful for grouping related types
//without having to create a new type
//let variableName: [type1, type2] [data1, data2]
type Album= {
    title: string;
    author: string;
    price: number;
}
let albumWithPlayCount : [Album, number] = [
    {
        title: "The G", author: "The G", price: 19.99
    },
    17889
]
//naming tuples makes it easier to understand the types
type MyTuple =[album: Album, playCount: number]
let albumWithPlayCount1: MyTuple = [
    {
        title: "The G", author: "The G", price: 19.99
    },
    17889
]

//exercise 1
type ShoppingCart = {
    userID: string
    //add items as an array
    items: string[] // items: Array<string>
}

const processCart = (cart: ShoppingCart) => {
    //Do something with the function
}

processCart({
    userID: "user123",
    items: ["item1", "item2", "item3"]
})

//exercise 2
type Recipe = {
    title: string;
    instructions: string;
    ingredients: Array<ingredientType>
  };

  type ingredientType = {
    name: string;
    quantity: string
  }
  
  const processRecipe = (recipe: Recipe) => {
    // Do something with the recipe in here
  };
  
  processRecipe({
    title: "Chocolate Chip Cookies",
    ingredients: [
      { name: "Flour", quantity: "2 cups" },
      { name: "Sugar", quantity: "1 cup" },
    ],
    instructions: "...",
  });