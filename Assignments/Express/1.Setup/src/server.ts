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
    path.join(_dirname, "1.Setup","src", "db.json"), "utf-8"
)
console.log(eventData)
//create server
const app = express()
//const app = express();

//simple get request
// app.get("/", (req, res) => {
//     res.send("Hello World, Am coming in hot")
// })

app.get("/", (req, res)=>{
    res.send(eventData)
})

//simple server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})