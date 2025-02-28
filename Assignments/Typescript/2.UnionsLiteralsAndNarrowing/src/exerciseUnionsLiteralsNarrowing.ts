//Exercise 1: string or null
function getUsername(username: string | null) {
    if (username !== null) {
        return `User: ${username}`
    } else {
        return 'Guest'
    }
}
const result = getUsername('Alice')
const result2 = getUsername(null)

//Exercise 2: Restricting Function Parameters
type ofDirection = "up" | "down" | "left" | "right"
function move(direction: ofDirection, distance: number) {
    // Move the specified distance in the given direction
}

move('up', 10)

move('left', 5)

//move('up-right',10,) -- error

//#Exercise 1: Narrowing with if Statements
function validateUsername(username: string | null): boolean {
    if (username) {
        return username.length > 5
    }
    return false
}
console.log(validateUsername('Matt1234'))
console.log(validateUsername('Alice'))
console.log(validateUsername('Bob'))

//Exercise 2: Throwing Errors to Narrow
// const appElement = document.getElementById('app');

// if (!appElement) {
//     throw new Error('Could not find app element')
// }


//Exercise 3: Using in to Narrow
type APIResponse =
    | {
        data: {
            id: string
        }
    }
    | {
        data?: undefined
        error: string
    }

const handleResponse = (response: APIResponse) => {
    // How do we check if 'data' is in the response?

    if (response.data) {
        return response.data.id
    } else {
        throw new Error(response.error)
    }
}

//Exercise 1: Narrowing Errors with instanceof
const somethingDangerous = () => {
    if (Math.random() > 0.5) {
        throw new Error('Something went wrong')
    }

    return 'all good'
}

try {
    somethingDangerous()
} catch (error) {
    if (error instanceof Error) {
        console.error(error.message)
    }
}

// Exercise 2: Narrowing unknown to a Value
export const parseValue0 = (value: unknown) => {
    if (typeof value === "object" &&
        value !== null &&
        "data" in value &&
        typeof (value as any).data === "object" &&
        "id" in (value as any).data
    ) {
        return true
    }
    throw new Error('Parsing error!')
}

const resultofParse = parseValue0({
    data: {
        id: '123',
    },
})

console.log(resultofParse)

//Exercise 3: Reusable Type Guards
const hasDataId = (value: unknown): value is { data: { id: string } } => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'data' in value &&
        typeof value.data === 'object' &&
        value.data !== null &&
        'id' in value.data &&
        typeof value.data.id === 'string'
    )
}
const parseValue = (value: unknown) => {
    if (hasDataId(value)) {
        return value.data.id
    }

    throw new Error('Parsing error!')
}

const parseValueAgain = (value: unknown) => {
    if (hasDataId(value)) {
        return value.data.id
    }

    throw new Error('Parsing error!')
}

//The Problem: The Bag Of Optionals
type State =
    | {
        status: 'loading'
    }
    | {
        status: 'error'
        error: string
    }
    | {
        status: 'success'
        data: string
    }

const renderUI = (state: State) => {
    if (state.status === 'loading') {
        return 'Loading...'
    }

    if (state.status === 'error') {
        return `Error: ${state.error.toUpperCase()}`
    }

    if (state.status === 'success') {
        return `Data: ${state.data}`
    }
}

//Exercise 1: Destructuring a Discriminated Union
type Circle = {
    kind: 'circle'
    radius: number
}

type Square = {
    kind: 'square'
    sideLength: number
}

type Shape = Circle | Square

function calculateArea(shape: Shape) {
    //Property 'sideLength' does not exist on type 'Shape'.
    //Property 'radius' does not exist on type 'Shape'.
    if (shape.kind === 'circle') {
        const { radius } = shape
        return Math.PI * radius * radius
    } else {
        const { sideLength } = shape
        return sideLength * sideLength
    }
}

//#Exercise 2: Narrowing a Discriminated Union with a Switch Statement
function calculateArea2(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius * shape.radius
            break;
        case "square":
            return shape.sideLength * shape.sideLength
            break;
        default:
            break;
    }
}

//#Exercise 3: Discriminated Tuples
type APIResponse1 = ['error', string] | ['success', User[]]

async function fetchData(): Promise<APIResponse1> {
    try {
        const response = await fetch('https://api.example.com/data')
        if (!response.ok) {
            return [
                'error',
                // Imagine some improved error handling here
                'An error occurred',
            ]
        }
        const data = await response.json()
        return ['success', data]
    } catch (error) {
        return ['error', 'An error occurred']
    }
}

async function exampleFunc() {
    const [status, value] = await fetchData()
    if (status === 'success') {
        console.log(value)
    } else {
        console.error(value)
    }
}

