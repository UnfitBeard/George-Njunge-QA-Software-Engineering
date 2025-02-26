//Callbacks -- function passed into another function as an argument to be executed after some operation or event completes
//returns result to main function after operation is completed

function addCallBack(z, callBackFn) {
  return callBackFn(z, 6);
}

function add(a, b) {
  return a + b;
}

console.log(addCallBack(10, add));

//Array methods with callbacks
//(method) Array<number>.map<number>(callbackfn: (value: number, index: number, array: number[]) => number, thisArg?: any): number[]
//reduce, map
const arr = [1, 2, 3, 4, 5];
const double = arr.map((num) => num * 2 /*callback function*/);
console.log(double); //[ 2, 4, 6, 8, 10 ]

//lets demo a netflix example to get details of a certain video
//1.login
//2.get all the videos
//3.get one video from all the videos
//4.get details of tha video
function loginUser(email, password, callBackFn) {
  setTimeout(() => {
    console.log(`We are loggin in to Netflix`);
    callBackFn({ userEmail: email, userPassword: password });
  }, 3000);
}

//get all videos
function getAllVideos({ userEmail }, callBackFn) {
  //we need the email and password to get all videos from thr callback fn in login user
  setTimeout(() => {
    console.log("We have all the recently watched videos");
    callBackFn({
      userEmail,
      videosInfo: ["Star wars", "The Mando", "Lord of the rings"],
    });
  }, 3000);
}

//get details of one video
function getVideoInfo(videosInfoObject, callBackFn) {
  //videos info coming from getAllVideos which was passed inside callbackFn
  setTimeout(() => {
    console.log("We have the details of one video");
    callBackFn({ video: videosInfoObject.videosInfo[1] }); //the Mando
  }, 3000);
}

//lets execute the sequence of all asynchronous operations
loginUser("gthe@g.com", "12345", (userObj) => {
  console.log(userObj.userEmail);

  //this is a single thread and we need to tap into it and get the values to be passed by the callback functions
  getAllVideos(userObj, (videoDetails) => {
    console.log(videoDetails);
    //get all details of mando
    getVideoInfo(videoDetails, (videos)=>{
      console.log(videos) //{ video: 'The Mando' }
      //we now have the mando

      //we can go ahead and get the timestamp of mando
      //we will add another callback function
    })
  });

  //to get details of mando we need to be inside the thread of getAllVideos
});

//the code is working and is leading to unreadable code....that leads to callback hell
//this can be solved using promises 