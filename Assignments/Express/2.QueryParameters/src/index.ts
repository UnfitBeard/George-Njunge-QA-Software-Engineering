// Key  value pairs sent in the URL to provide optional info to the server. Used for:
// Filtering,Sorting, pagination, and search queries
//we want to do this
//api/events/location-New York
//query params always come after a comma in a url and are separated by 8
import dotenv from "dotenv"
import express from "express"
import { readFileSync } from "fs"
import path, { dirname } from "path"

//configure the dotenv
dotenv.config()
const port = 3000
console.log(port)

//get the current directory
const _dirname = path.resolve()
console.log(_dirname)

//synchronously read the file
const eventData = readFileSync(
    path.join(_dirname, "1.Setup", "src", "db.json"), "utf-8"
)
console.log(eventData)
//create server
const app = express()
//const app = express();

//simple get request
// app.get("/", (req, res) => {
//     res.send("Hello World, Am coming in hot")
// })

app.get("/", (req, res) => {
    res.send(eventData)
})

//Sample events data
const books = [
    {
        "id": 1,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "genre": "Fiction",
        "year": 1960,
        "pages": 281,
        "publisher": "J.B. Lippincott & Co.",
        "description": "A novel about the serious issues of rape and racial inequality, told through the eyes of a young girl in the Deep South.",
        "image": "https://m.media-amazon.com/images/I/81gepf1eMqL.jpg",
        "price": 12.99
    },
    {
        "id": 2,
        "title": "1984",
        "author": "George Orwell",
        "genre": "Dystopian",
        "year": 1949,
        "pages": 328,
        "publisher": "Secker & Warburg",
        "description": "A dystopian novel set in a totalitarian society ruled by the Party, which has total control over every aspect of people's lives.",
        "image": "https://i.ebayimg.com/images/g/vZQAAeSwSbRnrJge/s-l500.webp",
        "price": 10.99
    },
    {
        "id": 3,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Fiction",
        "year": 1925,
        "pages": 180,
        "publisher": "Charles Scribner's Sons",
        "description": "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
        "image": "https://m.media-amazon.com/images/I/81af+MCATTL.jpg",
        "price": 9.99
    },
    {
        "id": 4,
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "genre": "Romance",
        "year": 1813,
        "pages": 279,
        "publisher": "T. Egerton, Whitehall",
        "description": "A romantic novel of manners that follows the character development of Elizabeth Bennet, the protagonist.",
        "image": "https://i.ebayimg.com/images/g/ikQAAOSwm8JnkrMW/s-l500.webp",
        "price": 8.99
    },
    {
        "id": 5,
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "genre": "Fiction",
        "year": 1951,
        "pages": 234,
        "publisher": "Little, Brown and Company",
        "description": "A story about Holden Caulfield's experiences in New York City after being expelled from prep school.",
        "image": "https://m.media-amazon.com/images/I/81OthjkJBuL.jpg",
        "price": 11.99
    },
    {
        "id": 6,
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "genre": "Fantasy",
        "year": 1937,
        "pages": 310,
        "publisher": "George Allen & Unwin",
        "description": "A fantasy novel about the adventures of Bilbo Baggins, a hobbit, who sets out on a quest to win a share of a dragon's treasure.",
        "image": "https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg",
        "price": 14.99
    },
    {
        "id": 7,
        "title": "Fahrenheit 451",
        "author": "Ray Bradbury",
        "genre": "Dystopian",
        "year": 1953,
        "pages": 249,
        "publisher": "Ballantine Books",
        "description": "A dystopian novel about a future society where books are banned, and 'firemen' burn any that are found.",
        "image": "https://i.ebayimg.com/images/g/v0AAAOSwxrpkfnD1/s-l500.webp",
        "price": 10.49
    },
    {
        "id": 8,
        "title": "Moby-Dick",
        "author": "Herman Melville",
        "genre": "Adventure",
        "year": 1851,
        "pages": 635,
        "publisher": "Harper & Brothers",
        "description": "The story of Captain Ahab's obsessive quest to kill the white whale, Moby-Dick.",
        "image": "https://i.ebayimg.com/images/g/aEQAAOSwuYhnTx6N/s-l500.webp",
        "price": 13.99
    },
    {
        "id": 9,
        "title": "War and Peace",
        "author": "Leo Tolstoy",
        "genre": "Historical Fiction",
        "year": 1869,
        "pages": 1225,
        "publisher": "The Russian Messenger",
        "description": "A novel that chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society.",
        "image": "https://i.ebayimg.com/images/g/28AAAOSw5Alf~fcP/s-l500.webp",
        "price": 18.99
    },
    {
        "id": 10,
        "title": "The Odyssey",
        "author": "Homer",
        "genre": "Epic Poetry",
        "year": -800,
        "pages": 541,
        "publisher": "Unknown",
        "description": "An epic poem that follows the Greek hero Odysseus on his journey home after the fall of Troy.",
        "image": "https://i.ebayimg.com/images/g/65oAAOSwsvFnqNgJ/s-l500.webp",
        "price": 16.49
    }
]


//Lets create a get API
app.get('/api/booksData', (req, res)=>{
    res.send(books)
})
app.get('/api/booksFilter', (req, res)=>{
    try {
        const {id, title, author, year, pages} = req.query

        //on the first filter, the whole events havent been filtered
        let filteredEvents = [...books]

        //filtering logic
        if (title) {
            filteredEvents = filteredEvents.filter(event=>event.title.toLowerCase().includes((title as string).toLowerCase()))
        }
        if (author) {
            filteredEvents = filteredEvents.filter(event=>event.author.toLowerCase().includes((author as string).toLowerCase()))
        }
        // if (year) {
        //     const priceNum = parseFloat(year as string)
        //     filteredEvents = filteredEvents.filter(event=>event.year === +year)
        // }
    } catch (error) {
        
    }
})



//simple server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})