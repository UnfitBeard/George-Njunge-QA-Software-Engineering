 const users = [
    {
      id: 1,
      name: "John",
      location: "New York",
      friends: [2, 3, 4],
      posts: [
        { content: "Great day at Central Park!", timestamp: "2024-05-10T12:00:00", likes: 15 },
        { content: "Loving the vibes in NYC!", timestamp: "2024-05-15T08:30:00", likes: 8 },
        { content: "Visited the Statue of Liberty today!", timestamp: "2024-05-05T17:45:00", likes: 20 }
      ]
    },
    {
      id: 2,
      name: "Alice",
      location: "San Francisco",
      friends: [1, 3],
      posts: [
        { content: "Hiking in the Bay Area!", timestamp: "2024-05-12T14:20:00", likes: 12 },
        { content: "Enjoying the sunny weather!", timestamp: "2024-05-14T11:10:00", likes: 6 }
      ]
    },
    {
      id: 3,
      name: "Emily",
      location: "Los Angeles",
      friends: [1, 2, 4],
      posts: [
        { content: "Beach day in LA!", timestamp: "2024-05-08T09:45:00", likes: 25 },
        { content: "Exploring Hollywood!", timestamp: "2024-05-16T16:55:00", likes: 5 }
      ]
    },
    {
      id: 4,
      name: "David",
      location: "Chicago",
      friends: [2],
      posts: [
        { content: "Deep dish pizza is the best!", timestamp: "2024-05-11T10:30:00", likes: 18 },
        { content: "Trying out a new jazz club tonight!", timestamp: "2024-05-13T20:00:00", likes: 3 }
      ]
    },
    {
      id: 5,
      name: "Sarah",
      location: "Seattle",
      friends: [3, 1],
      posts: [
        { content: "Coffee time in the Pacific Northwest!", timestamp: "2024-05-09T15:15:00", likes: 9 },
        { content: "Exploring the Olympic National Park!", timestamp: "2024-05-14T07:00:00", likes: 11 }
      ]
    }
  ];

  //1 filter active users who have posted atleast once
// const usersWhoHavePostedOnce = users.filter((user)=>user.posts.length >= 1)
// console.log(usersWhoHavePostedOnce)

// const extractPopularPosts = usersWhoHavePostedOnce.filter(user=> user.posts.length >=1 )
// console.log(extractPopularPosts)
// function deepFlattenToObject(obj, prefix = '') {
//   return Object.keys(obj).reduce((acc, k) => {
//     const pre = prefix.length ? prefix + '_' : '';
//     if (typeof obj[k] === 'object' && obj[k] !== null) {
//       if (Array.isArray(obj[k])) {
//         obj[k].forEach((item, index) => {
//           Object.assign(acc, deepFlattenToObject(item, `${pre}${k}_${index}`));
//         });
//       } else {
//         Object.assign(acc, deepFlattenToObject(obj[k], pre + k));
//       }
//     } else {
//       acc[pre + k] = obj[k];
//     }
//     return acc;
//   }, {});
// }


// console.log(deepFlattenToObject(extractPopularPosts))

const alsoDeepFlattenObjects = () => {

}
// Declare an object
let ob = {
	Company: "GeeksforGeeks",
	Address: "Noida",
	contact: +91-999999999,
	mentor: {
		HTML: "GFG",
		CSS: "GFG",
		JavaScript: "GFG"
	}
};

// Declare a flatten function that takes 
// object as parameter and returns the 
// flatten object
const flattenObj = (ob) => {

	// The object which contains the
	// final result
	let result = {};

	// loop through the object "ob"
	for (const i in ob) {

		// We check the type of the i using
		// typeof() function and recursively
		// call the function again
		if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
			const temp = flattenObj(ob[i]);
			for (const j in temp) {

				// Store temp in result
				result[i + '.' + j] = temp[j];
			}
		}

		// Else store ob[i] in result directly
		else {
			result[i] = ob[i];
		}
	}
	return result;
};

console.log(flattenObj(users));
