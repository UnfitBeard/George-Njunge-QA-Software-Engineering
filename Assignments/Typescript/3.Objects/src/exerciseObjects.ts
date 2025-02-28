//Exercise 1: Create an Intersection Type
type UserO = {
  name: string;
  email: string;
} & BaseEntity1;

type Product = {
  name: string;
  price: number;
} & BaseEntity1;

type BaseEntity1 = { id: string, createdAt: Date }

// #
// Exercise 2: Extending Interfaces

interface BaseEntity {
  id: string;
  createdAt: Date;
}
interface UserInterface1 {
  name: string;
  email: string;
}

interface Product1 {
  name: string;
  price: number;
};

interface UserInterface1 extends BaseEntity1 {
  name: string;
  email: string;
}

interface Product1 extends BaseEntity1 {
  name: string;
  price: number;
}

// Exercise 1: Use an Index Signature for Dynamic Keys
// const scores = {};

// scores.math = 95;
// Property 'math' does not exist on type '{}'.
// scores.english = 90;
// Property 'english' does not exist on type '{}'.
// scores.science = 85;

const scores: Scores = {};
interface Scores {
  [key: string]: number
}
scores.math = 95;
scores.english = 90;
scores.science = 85;

// Exercise 2: Default Properties with Dynamic Keys
interface Scores { }

// Unused '@ts-expect-error' directive.
// const scores: Scores = {
//   math: 95,
//   english: 90,
// };

// scores.athletics = 100;
// Property 'athletics' does not exist on type 'Scores'.
// scores.french = 75;
// Property 'french' does not exist on type 'Scores'.
// scores.spanish = 70;

interface Scores1 {
  math: number;
  english: number;
  science: number;
  [key: string]: number;
}
// @ts-expect-error science should be provided
const scores1: Scores1 = {
  math: 95,
  english: 90,
};
scores1.athletics = 100;
scores1.french = 75;
scores1.spanish = 70;


// Exercise 3: Restricting Object Keys With Records
type Environment = "development" | "production" | "staging";

type Configurations = Record<Environment, { apiBaseUrl: string; timeout: number; }>;

const configurations: Configurations = {
  development: {
    apiBaseUrl: "http://localhost:8080",
    timeout: 5000,
  },
  production: {
    apiBaseUrl: "https://api.example.com",
    timeout: 10000,
  },
  staging: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
  },
  // @ts-expect-error
  notAllowed: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
  },
};

// Exercise 4: Dynamic Key Support
export const hasKey = (obj: object, key: string | symbol | number) => {
  return obj.hasOwnProperty(key);
};





//#
// Exercise 1: Expecting Certain Properties
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

type PickNameAndAgeUser = Pick<User, "name"| "email">

const fetchUser = async (): Promise<PickNameAndAgeUser> => {
  const response = await fetch("/api/user");
  const user = await response.json();
  return user;
};

const example = async () => {
  const user = await fetchUser();
};
//we can also use an interface containing only name and age

// Exercise 2: Updating a Product
interface Product3 {
  id: number;
  name: string;
  price: number;
  description: string;
}
type ProductInfoType = Pick<Product3, "name" & "price" & "description"> // OR productInfo: Partial<Omit<Product, "id">>

const updateProduct = (id: number, productInfo: ProductInfoType) => {
  // Do something with the productInfo
};
updateProduct(1, {
  //Argument of type '{ name: string; }' is not assignable to parameter of type 'Product'.
  //Type '{ name: string; }' is missing the following properties from type 'Product': id, price, description
  name: "Book",
});

updateProduct(1, {
  //Argument of type '{ price: number; }' is not assignable to parameter of type 'Product'.
  //Type '{ price: number; }' is missing the following properties from type 'Product': id, name, description
  price: 12.99,
});
