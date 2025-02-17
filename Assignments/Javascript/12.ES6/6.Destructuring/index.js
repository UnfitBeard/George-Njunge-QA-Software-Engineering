//Destructuring --- is used to access values from arrays or properties from objects
//syntax 

//const { prop1, prop2 } = objectName
const info = {
    fname: "George",
    lname:"Njunge",
    idNo: 235456
}

//traditional ways of accessing values from an object
console.log(info.fname + " " + info.lname)

//using destructuring 
//const { objectKey:value } = objectName

const { fname: firstName, lname : lastName } = info
console.log(`${firstName} ${lastName}`) //George Njunge

//Default alues in arrays destructuring
//syntax
//const [ element1 = defaultValue1 ] = array

const numbers = [1, 2]
const [ first = 10, second = 20, third = 40 ] = numbers
console.log(`${first} ${second} ${third}`) // 1 2 40.....first and second not replaced as they exist but third is added as it didnt exist


//object default desctructuring
//const { property1 = deafultValue1 }= object
const user = {
    name: "The G",
    age: 25
};

//we assigned country a default value since its not available inside user
const { name, age , country = 'Kenya'} = user
console.log(`${name} ${age} ${country}`) //The G 25 Kenya


const { name : userName , age: userAge, country: userCountry} = user
console.log(`${userName} ${userAge} ${userCountry}`)


//destructuring in arrays
// syntax: const [item1, item2] = arrayName
const num = [1,2,3,4]

//traditional way of accessing
const firstItem = num[0]
const secondItem = num[1]
const thirdItem = num[2]
console.log(firstItem, secondItem, thirdItem)

//Destructuring
//we can add a default value here
const [first1, second1, third1, fourth1, fifth1 = 50] = num
console.log(`${first1} ${second1} ${third1} ${fourth1} ${fifth1}`)


//adding defaultValues to Array destructure
// const numbers = [1, 2]
// const [ first = 10, second = 20, third = 40 ] = numbers
// console.log(`${first} ${second} ${third}`) // 1 2 40.....first and second not replaced as they exist but third is added as it didnt exist

//destructuring nested objects
const users1 = {
    name: 'George',
    address: {
        city: "Nairobi"
    }
}

//to access city
console.log(users1.address.city)

//Destructuring the nested objects
const { address } = users1
console.log(address)//{ city: 'Nairobi' }

//to destructure to a second level
const { address: {city}} = users1
console.log(city) //nairobi

//complex payment object
const payment = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal",
      "status": "VERIFIED",
      "payer_info": {
        "email": "buyer@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "payer_id": "PAYER12345",
        "country_code": "US",
        "shipping_address": {
          "recipient_name": "John Doe",
          "line1": "123 Main St",
          "line2": "Apt 4B",
          "city": "San Francisco",
          "state": "CA",
          "postal_code": "94107",
          "country_code": "US",
          "phone": "415-555-1234"
        }
      }
    },
    "transactions": [
      {
        "amount": {
          "total": "150.00",
          "currency": "USD",
          "details": {
            "subtotal": "140.00",
            "tax": "5.00",
            "shipping": "5.00",
            "handling_fee": "2.00",
            "insurance": "3.00",
            "discount": "-5.00"
          }
        },
        "description": "Purchase from Online Store",
        "invoice_number": "INV-123456",
        "payment_options": {
          "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
        },
        "item_list": {
          "items": [
            {
              "name": "Wireless Headphones",
              "sku": "WH-001",
              "price": "100.00",
              "currency": "USD",
              "quantity": 1
            },
            {
              "name": "Phone Charger",
              "sku": "PC-002",
              "price": "40.00",
              "currency": "USD",
              "quantity": 1
            }
          ],
          "shipping_address": {
            "recipient_name": "John Doe",
            "line1": "123 Main St",
            "line2": "Apt 4B",
            "city": "San Francisco",
            "state": "CA",
            "postal_code": "94107",
            "country_code": "US",
            "phone": "415-555-1234"
          }
        }
      }
    ],
    "redirect_urls": {
      "return_url": "https://example.com/success",
      "cancel_url": "https://example.com/cancel"
    },
    "note_to_payer": "Thank you for your purchase! Your order will be shipped within 2-3 business days.",
    "application_context": {
      "brand_name": "My Online Store",
      "landing_page": "BILLING",
      "user_action": "PAY_NOW",
      "shipping_preference": "SET_PROVIDED_ADDRESS"
    }
  }
  
//using dot notations
// Accessing different parts of the object using dot notation
console.log(payment.payer.payer_info.email);
console.log(payment.payer.payer_info.first_name); 
console.log(payment.payer.payer_info.shipping_address.city); 
console.log(payment.transactions[0].amount.total); 
console.log(payment.transactions[0].amount.details.tax);
console.log(payment.transactions[0].item_list.items[0].name); 
console.log(payment.transactions[0].item_list.items[1].price);

//destructuring payers emai;, city , tax from first transaction using destructuring 
const {
    payer: {
      payer_info: { email, shipping_address: { city: myCity } }
    },
    transactions: [
      {
        amount: { details: { tax } }
      }
    ]
  } = payment;
  
  console.log(email); // "buyer@example.com"
  console.log(myCity);  // "San Francisco"
  console.log(tax);   // "5.00"


//Destructuring nested Arrays
const _numbers = [1, [2,3], 4];
const [_num1, [_num2, _num3 ], _num4] = _numbers
console.log(_num1,_num2,_num3,_num4) //1 2 3 4

const numbers1 = [1, [2,3,[5,6]], 4];
const [number1, [number2, number3, [number4, number5]], number6] = numbers1
console.log(number1,number2,number3,number4, number5,number6) //1 2 3 5 6 4

//Destructuring in Function Parameters
const newNumbers = [1,2,3]
function processNumbers([first, second, third]=newNumbers) {
    console.log(first, second, third)
}

processNumbers(newNumbers); //1 2 3

