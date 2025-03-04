//#Exercise 1: Inference with an Array of Objects
// type ButtonAttributes = {
//     type: "button" | "submit" | "reset";
// };

// const modifyButtons = (attributes: ButtonAttributes[]) => { };

// const buttonsToChange = [
//     {
//         type: "button",
//     },
//     {
//         type: "submit",
//     },
// ];

// modifyButtons(buttonsToChange)
type ButtonAttributes = {
    type: "button" | "submit" | "reset";
  };
  
  const modifyButton = (attributes: ButtonAttributes[]) => {};
  
  const buttonsToChange: ButtonAttributes[] = [
    {
      type: "button",
    },
    {
      type: "submit",
    },
  ];
  
  modifyButton(buttonsToChange); // No error

// Argument of type '{ type: string; }[]' is not assignable to parameter of type 'ButtonAttributes[]'.
//   Type '{ type: string; }' is not assignable to type 'ButtonAttributes'.
//     Types of property 'type' are incompatible.
//       Type 'string' is not assignable to type '"button" | "submit" | "reset"'.ts(2345)
// const buttonsToChange: {
//     type: string;
// }[]

// Exercise 2: Avoiding Array Mutation
function printNames(names: readonly string[] /**or ReadonlyArray<string> */) {
  for (const name of names) {
    console.log(name);
  }

  // @ts-expect-error
//Unused '@ts-expect-error' directive.
  names.push("John");

  // @ts-expect-error
//Unused '@ts-expect-error' directive.
  names[0] = "Billy";
}

//Exercise 3: An Unsafe Tuple
const dangerousFunction = (arrayOfNumbers: number[]) => {
    arrayOfNumbers.pop();
    arrayOfNumbers.pop();
  };

  type Coordinate = readonly [number,number];
  const myHouse: Coordinate = [0, 0];

//dangerousFunction(myHouse,) //Argument of type 'Coordinate' is not assignable to parameter of type 'number[]'.The type 'Coordinate' is 'readonly' and cannot be assigned to the mutable type 'number[]'.

// Exercise 1: Returning A Tuple From A Function
const fetchData1 = async (): Promise<[Error | undefined ,any?]> => {
    const result = await fetch("/");
  
    if (!result.ok) {
      return [new Error("Could not fetch data.")];
    }
  
    const data = await result.json();
  
    return [undefined, data];
  };

  //Inferring Literal values in arrays
  type ButtonAttributes1 = {
    type: "button" | "submit" | "reset";
  };
  const modifyButtons = (attributes: ButtonAttributes[]) => {};
  const buttonsToChange1 = [
    {
      type: "button",
    } as const,
    {
      type: "submit",
    } as const,
  ];
  modifyButtons(buttonsToChange1);
