 //connecting to a database
//synchronous programming is blocking --- one function has to be executed before the other one

 function connectDB() {
    //code for connecting to the DB
 }

 function fetchData() {
    connectDB(mongoDBInstance)
    //fetching data
 }

 //Asynchronous programming is non blocking....lets other operations while waiting for a task to complete. e.g you can fetch data from a server without freexing the rest of your application

 async function connectDB(db) {
    await connectURL
    //code for connection
    //exception handlings eng no internet connections or networks
 }
 async function fetchData() {
   await connectDB(mongoDBInstance)
    //fetching data
 }

 //Event Loop - manages execution of code....JS is single threaded...only one piece of code runs at a time
 /* 
 components
 Call Stack, web APIs, Task Queue/callback queue, microTask Queue, Event loop
 
 
 */
 //Handling asynchronous code
 //callbacks -- function passed as an argument of another function
 //promises --- .then(), .catch() 
 //async/awai

