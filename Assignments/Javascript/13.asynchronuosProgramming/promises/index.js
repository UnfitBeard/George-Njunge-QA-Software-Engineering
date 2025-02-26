//Promise states
//Pending - Initial state, neither completed nor failed
//Fulfilled - operation completed successfully
//Rejected - operation failed
//syntax

let promise = new Promise((resolve, reject) => {
  if (!Promise.resolve) {
    resolve("Success message");
  } else {
    reject("Error Message");
  }
}); //on pending state
console.log(promise);

//Consuming a promise is done using .then() and .catch() methods, which allow you to define how to handle success
promise
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

//If the promise is false it will reject.....//Error Message
//Handling the pyramid of doom





//lets demo a netflix example to get details of a certain video
//1.login
//2.get all the videos
//3.get one video from all the videos
//4.get details of tha video

//In the place of our callback function we will return a promise

// function loginUser(email, password, callBackFn) {
//   setTimeout(() => {
//     console.log(`We are loggin in to Netflix`);
//     callBackFn({ userEmail: email, userPassword: password });
//   }, 3000);
// }
function loginUser(email, password) {
   //return new promise instead of a callback
   return new Promise((resolve,reject)=>{
      setTimeout(() => {
         console.log(`We are loggin in to Netflix`);
         resolve({ userEmail: email, userPassword: password });
       }, 3000);
   }) 
   
 }

//get all videos
// function getAllVideos({ userEmail }, callBackFn) {
//   //we need the email and password to get all videos from thr callback fn in login user
//   setTimeout(() => {
//     console.log("We have all the recently watched videos");
//     callBackFn({
//       userEmail,
//       videosInfo: ["Star wars", "The Mando", "Lord of the rings"],
//     });
//   }, 3000);
// }
function getAllVideos({ userEmail }) {
   return new Promise((resolve, reject)=>{
      setTimeout(() => {
         console.log("We have all the recently watched videos");
         resolve({
           userEmail,
           videosInfo: ["Star wars", "The Mando", "Lord of the rings"],
         });
       }, 3000);
   })
   
 }

//get details of one video
// function getVideoInfo(videosInfoObject, callBackFn) {
//   //videos info coming from getAllVideos which was passed inside callbackFn
//   setTimeout(() => {
//     console.log("We have the details of one video");
//     callBackFn({ video: videosInfoObject.videosInfo[1] }); //the Mando
//   }, 3000);
// }
function getVideoInfo(videosInfoObject) {
   return new Promise((resolve, reject)=>{
      setTimeout(() => {
         console.log("We have the details of one video");
         resolve({ video: videosInfoObject.videosInfo[1] });//the Mando
       }, 3000);
   })   
 }

//lets execute the sequence of all asynchronous operations
loginUser("gthe@g.com", "12345")
.then((userObj)=>getAllVideos(userObj))
.then((video)=>getVideoInfo(video))

  //this is a single thread and we need to tap into it and get the values to be passed by the callback functions
  
    //get all details of mando
     //{ video: 'The Mando' }
      //we now have the mando

      //we can go ahead and get the timestamp of mando

  //to get details of mando we need to be inside the thread of getAllVideos

//the code is working and is leading to unreadable code....that leads to callback hell
//this can be solved using promises


