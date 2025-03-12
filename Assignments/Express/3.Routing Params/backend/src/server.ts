import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import 'dotenv/config'
import { readFileSync } from "fs"
import path, { parse } from 'path'
import cors from "cors"

//configure the dotenv 
//top most level
dotenv.config({ path: __dirname + "./../src/.env" })

//instance of express
//the second most top level
const app = express()

//load the variables
const port = 5000
const secret = process.env.SECRET
console.log(port) //3000
console.log(secret) //a_very_strong_secret_for_you


//eneable CORS for all origins  
//app.use(cors())

//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))

//get the current  directory 
const _dirname = path.resolve()

//synchronously read the file
const eventData = readFileSync(
    path.join(_dirname, "src", "db", "eventsData.json"), "utf-8"
)

//console.log(eventData)


// Sample Event Data
const events = [
    { id: 1, title: "Summer Music Festival", price: 50, location: "New York", company: "Music Festivals Inc." },
    { id: 2, title: "Food and Wine Expo", price: 75, location: "San Francisco", company: "Food and Wine Events LLC" },
    { id: 3, title: "Comic Con", price: 35, location: "Los Angeles", company: "Comic Con International" },
    { id: 4, title: "Art and Design Fair", price: 20, location: "Chicago", company: "Art and Design Expo LLC" },
    { id: 5, title: "Holiday Market", price: 5, location: "New York", company: "Holiday Markets Inc." }
];


//a simple get request saying hello world  
app.get('/', (req, res) => {
    res.send(`Hello World, Be humble to us`)
})


//RoutingParams
//Lets fetch a specific event by id
//1.Extract ID
//2.Convert it into a number
//3.Find the event in the dataset
//4.Return the event or 404 error if not found

app.get('/api/eventsData/:id', (req: Request, res: Response) => {
    try {
        //Extract ID
        const eventId: number = parseInt(req.params.id)
        if (isNaN(eventId)) {
            res.status(401).json({message: "Id not a number"})
            return
        }
        //find the event with the ID in the event
        const event = events.find((eventObj)=>eventObj.id===eventId)

        if (!event) {
            res.status(400).json({message :"Event was not found"})
            return//explicitly return to stop further execution
        }
            res.json(event)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

//Multiple Request Params
app.get("/api/eventsData/:id/:category", (req, res)=>{
    try {
        const { id, category } = req.params
        const parsedID = Number(id)
        res.send(`category : ${category}, eventID: ${id}`)
    } catch (error) {
        
    }
})

//Optional Route Params
//use a question mark after the parameter name
app.get('/api/eventsDataByID/:id?', (req: Request, res: Response) => {
    try {
        //Extract ID
        const eventId: number = parseInt(req.params.id)

        if(eventId) {
        if (isNaN(eventId)) {
            res.status(401).json({message: "Id not a number"})
            return
        }
        //find the event with the ID in the event
        const event = events.find((eventObj)=>eventObj.id===eventId)

        if (!event) {
            res.status(400).json({message :"Event was not found"})
            return//explicitly return to stop further execution
        }
            res.json(event)
            return
    }
    res.json(events)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

//Combining Route Params with query params for advanced filtering

//Now, let's create a GET API route that filters events based on query parameters
app.get('/api/eventsFilter', (req: Request, res: Response) => {
    try {
        const { title, location, company, price } = req.query

        //on the first filters, the whole evets havent been filtered
        let filteredEvents = [...events]

        //filtering logic
        if (title) {
            filteredEvents = filteredEvents.filter((event) => event.title.toLowerCase().includes((title as string).toLowerCase()))
        }
        if (location) {
            filteredEvents = filteredEvents.filter((event) => event.location.toLowerCase().includes((location as string).toLowerCase()))
        }
        if (company) {
            filteredEvents = filteredEvents.filter((event) => event.company.toLowerCase().includes((company as string).toLowerCase()))
        }
        if (price) {
            const priceNum = parseFloat(price as string)
            filteredEvents = filteredEvents.filter((event) => event.price === priceNum)
        }


        res.send(filteredEvents)
    } catch (error) {

    }
})

// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//DATABASE OPS
//CRUD....//post---adding info to the db

//READ...get---reading info from the database
//UPDATE.....put and patch.....update details
//PUT---replace the entire record
//PATCH---update specific records

//DELETE.....removing
//SOC - separtion of concersn 