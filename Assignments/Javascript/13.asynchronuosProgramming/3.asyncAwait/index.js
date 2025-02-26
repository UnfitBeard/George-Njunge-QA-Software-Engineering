//async await is an asynchronous Function that automatically returns a promise
//adding an async keyword before a function automatically returns a promise

//inside the async function we use awaitto pause execution
//Simplified Syntax
//Error Handling
//Avoiding callback Hell

async function add(x, y) {
    return x + y
}

const addMarks = async () => {
  //we can use await to pause execution until add resolves
  console.log(`I am adding marks`)
  const result = await add(4, 5)
  console.log(result)
}

addMarks()

//lets demo a netflix example to get details of a certain video
//1.login
//2.get all the videos
//3.get one video from all the videos
//4.get details of tha video

//In the place of our callback function we will use await

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

async function fetchUserVideos() {
try {
  const user = await loginUser("Gthenman@g.com", "234334")
  const videos = await getAllVideos(user)
  const videoDetails = await getVideoInfo(videos)
  console.log(videoDetails)
} catch (error) {
  
}
}
 //this is a single thread and we need to tap into it and get the values to be passed by the callback functions
 
   //get all details of mando
    //{ video: 'The Mando' }
     //we now have the mando

     //we can go ahead and get the timestamp of mando

 //to get details of mando we need to be inside the thread of getAllVideos

//the code is working and is leading to unreadable code....that leads to callback hell
//this can be solved using promises


