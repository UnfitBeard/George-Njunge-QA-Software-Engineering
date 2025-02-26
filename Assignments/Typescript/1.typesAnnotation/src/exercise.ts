//Exercise 1: Basic Types with Function Parameters

// export const add = (a: boolean, b: boolean) => {
//     return a + b;
// };
// console.log(add(1,2))
export const add = (a: number, b: number) => {
    return a + b;
};
console.log(add(1, 2))

//Exercise 2: Annotating Empty Parameters
// const concatTwoStrings = (a, b) => {
//     return [a, b].join(" ");
// };
// console.log("Hello","George")
const concatTwoStrings = (a: string, b: string) => {
    return [a, b].join(" ");
};
console.log("Hello", "George")

//Exercise 3: The Basic Types
// export let example1: string = "Hello World!";
// export let example2: string = 42;
// export let example3: string = true;
// export let example4: string = Symbol();
// export let example5: string = 123n;
export let example1: string = "Hello World!";
export let example2: number = 42;
export let example3: boolean = true;
export let example4: symbol = Symbol();
export let example5: bigint = 123n;

//Exercise 4: The any Type
const handleFormData = (e: any) => {
    e.preventDefault();

    const data = new FormData(e.terget);

    const value = Object.fromEntries(data.entries());

    return value;
};

//Exercise 1: Object Literal Types
//   const concatName = (user) => {
//       return `${user.first} ${user.last}`;
//     };

type User = {
    first: string;
    last: string
}

const george = {
    first: "G",
    last: "T"
}
const concatName = (user: User) => {
    return `${user.first} ${user.last}`;
};

console.log(concatName(george))

//Exercise 2: Optional Property Types
// const concatName1 = (user: { first: string; last: string }) => {
//     if (!user.last) {
//       return user.first;
//     }

//     return `${user.first} ${user.last}`;
//   };
// const result = concatName({
//     first: "John",
//     });//Argument of type '{ first: string; }' is not assignable to parameter of type '{ first: string; last: string; }'.
//Property 'last' is missing in type '{ first: string; }' but required in type '{ first: string; last: string; }'.
const concatName1 = (user: { first: string; last?: string }) => {
    if (!user.last) {
        return user.first;
    }

    return `${user.first} ${user.last}`;
};
const george1 = {
    first: "G"
}
console.log(concatName1(george1))

//Exercise 1: The type Keyword
const getRectangleArea = (rectangle: Rectangle) => {
    return rectangle.width * rectangle.height;
};

const getRectanglePerimeter = (rectangle: Rectangle) => {
    return 2 * (rectangle.width + rectangle.height);
};

type Rectangle = {
    width: number;
    height: number;
}

const rectangle = {
    height: 10,
    width: 20
}
console.log(getRectangleArea(rectangle))
console.log(getRectanglePerimeter(rectangle))

//Exercise 1: Array Type
// type ShoppingCart = {
//     userId: string;
//   };

//   const processCart = (cart: ShoppingCart) => {
//     // Do something with the cart in here
//   };

//   processCart({
//     userId: "user123",
//     items: ["item1", "item2", "item3"],
//   });
type ShoppingCart = {
    userId: string;
    items: string[]
};

const processCart = (cart: ShoppingCart) => {
    return cart
};

console.log(processCart({
    userId: "user123",
    items: ["item1", "item2", "item3"],
}));


//Exercise 2: Arrays of Objects
type Recipe = {
    title: string;
    instructions: string;
    ingredients: ingredientsType[]
};

type ingredientsType = {
    name: string;
    quantity: string;
}

const processRecipe = (recipe: Recipe) => {
    return recipe
};

console.log(processRecipe({
    title: "Chocolate Chip Cookies",
    ingredients: [
        { name: "Flour", quantity: "2 cups" },
        { name: "Sugar", quantity: "1 cup" },
    ],
    instructions: "...",
}));

//Exercise 3: Tuples
const setRange = (range: [number, number]) => {
    const x = range[0];
    const y = range[1];
  
    // Do something with x and y in here
    // x and y should both be numbers!
};
setRange([0, 1]);
//setRange([0, 10, 20]);//only accepts a tuple of two numbers

//Exercise 4: Optional Members of Tuples
const goToLocation = (coordinates: [latitude: number, longitude: number, elevation?:number]) => {
    const latitude = coordinates[0];
    const longitude = coordinates[1];
    const elevation = coordinates[2];
  
    // Do something with latitude, longitude, and elevation in here
    console.log(latitude, longitude, elevation) 
  };
  goToLocation([1,2,3])


//Exercise 1: Passing Types to Map
const userMap = new Map<number, UserMap>();

type UserMap = {
    name: string;
    age: number;
}
userMap.set(1, { name: "Max", age: 30 });
userMap.set(2, { name: "Manuel", age: 31 });
// userMap.set("3", { name: "Anna", age: 29 });
// userMap.set(3, "123"); errors


//Exercise 2: JSON.parse() Can't Receive Type Arguments
const parsedData = JSON.parse('{"name": "Alice", "age": 30}');
    //Expected 0 type arguments, but got 1.


// Exercise 1: Optional Function Parameters
const concatName3 = (first: string, last?: string) => {
    if (!last) {
      return first;
    }
  
    return `${first} ${last}`;
  };
const result = concatName3("John", "Doe");
const result2 = concatName3("John");

//Exercise 2: Default Function Parameters
const concatName4= (first: string, last: string = "Pocock") => {
    if (!last) {
      return first;
    }
  
    return `${first} ${last}`;
  };

  const result1 = concatName4("John", "Doe");
  const result3 = concatName4("John");
  console.log(result1)
  console.log(result3)

//Exercise 3: Rest Parameters
export function concatenate(...strings: string[]) {
    //Rest parameter 'strings' implicitly has an 'any[]' type.
      return strings.join("");
}

// Exercise 4: Function Types
type User1 = {
    id: string;
    name: string;
  };
  
//Parameter 'makeChange' implicitly has an 'any' type.
  const modifyUser = (user: User1[], id: string, makeChange) => {
    return user.map((u) => {
      if (u.id === id) {
        return makeChange(u);
      }
  
      return u;
    });
  };

  const users: User1[] = [
    { id: "1", name: "John" },
    { id: "2", name: "Jane" },
  ];
  
  modifyUser(users, "1", (user) => {
  //Parameter 'user' implicitly has an 'any' type.
    return { ...user, name: "Waqas" };
  });

  //Exercise 5: Functions Returning void
  const addClickEventListener = (listener) => {
    //Parameter 'listener' implicitly has an 'any' type.
      document.addEventListener("click", listener);
    };
    
    addClickEventListener(() => {
      console.log("Clicked!");
    });

    addClickEventListener("abc",);