//data structure -- anything that holds data
//objects - holds data as a collection of key:value pairs
// Object can be created using { }

//On an object you add commas , after every key:value pair
// { key1:value1, key2:value2, key3:value3 }

//empty object
const myObject = {};
console.log(typeof myObject); //object

//adding data to an object
//using the dot . noatation
//ObjectName.key = value
myObject.firstName = "GtheMan";
myObject.age = 25;//no
myObject.marks = [123, 45, 67, 89];//array
myObject.info = {
  idNum: "2222222",
  country: "Kenya",
};

console.log(myObject)

//Objects can contain different data types
const Bruno = {
    fname:"Bruno",
    age:29,
    marks: [23,56,"D minus"],
    govInfo: {
        idNum: "1234567453",
        location: "Nairobi",
    },
    meanGrade: function(meanGrade) {
        return meanGrade
    }
}


//access modifiers in Objects
//1. A dot notation
//2. index string type
//3. using object.keys
//4. destructuring
//5. using this keyword

//1.dot notation -- objectname.keyname
console.log(Bruno.age)

//2. index string type -- pass in a key as a string inside square brackets
//objectName["keyName"]
console.log(Bruno["fname"])

//3. using object.keys -- The Object.keys() static method returns an array of a give objects on a varianle string type name
// Object.keys(ObjectName)
console.log(Object.keys(Bruno)) //[ 'fname', 'age', 'marks', 'govInfo', 'meanGrade' ]

//lets access the age key
console.log(Object.keys(Bruno)[1]) //[ 'fname', 'age', 'marks', 'govInfo', 'meanGrade' ]

//lets access the age key
let arrayKeys = Object.keys(Bruno)
console.log(arrayKeys[1])

//once we have the key we need we can now use the string key type to access
console.log(Bruno[arrayKeys[1]])

//making it complex
//ObjectName[Object.keys(objectName)[index]]
console.log(Bruno [Object.keys(Bruno)[1]]) //26

//using this keyword -- used to refe to the current context
const myInfo = {
    name:"GtheMan",
    age: "30",
    hobbies: ["Reading, Writing"],
    isMarried: false,
    meanGrade: function grades() {
        return `Your mean Grade is: ${this.meanGrade}`
    },
    keyFn: function(n) {
        return this[Object.keys(this)[n]]
        //this refers to this current object
    }
}
console.log(myInfo.keyFn(1)) //30 -- its the age

//parse json --- json.parse(ObjectName)
const products = [
    {
      "product_id": "P001",
      "product_name": "Laptop",
      "quantity_sold": 15,
      "price_per_unit": 899.99,
      "total_sales": 13499.85,
      "date": "2025-02-01"
    },
    {
      "product_id": "P002",
      "product_name": "Smartphone",
      "quantity_sold": 30,
      "price_per_unit": 499.99,
      "total_sales": 14999.70,
      "date": "2025-02-02"
    },
    {
      "product_id": "P003",
      "product_name": "Headphones",
      "quantity_sold": 50,
      "price_per_unit": 99.99,
      "total_sales": 4999.50,
      "date": "2025-02-03"
    },
    {
      "product_id": "P004",
      "product_name": "Tablet",
      "quantity_sold": 25,
      "price_per_unit": 299.99,
      "total_sales": 7499.75,
      "date": "2025-02-04"
    },
    {
      "product_id": "P005",
      "product_name": "Smartwatch",
      "quantity_sold": 40,
      "price_per_unit": 199.99,
      "total_sales": 7999.60,
      "date": "2025-02-05"
    }
  ]
  console.log(`this is data inform of objects ${products}`)
//we can use json.stringify() that converts a js object into a string
console.log(`this is data as json strings ${JSON.stringify(products)}`)

