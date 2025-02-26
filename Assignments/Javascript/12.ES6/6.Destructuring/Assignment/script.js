const user = {
    id: "USER-123456",
    name: {
        first: "Alice",
        last: "Liddell"
    },
    email: "alice@example.com",
    address: {
        shipping: {
            street: "123 Rabbit Hole",
            city: "Wonderland",
            state: "Fantasy",
            postalCode: "12345",
            country: "WL"
        },
        billing: {
            street: "456 Mad Hatter Lane",
            city: "Tea Party",
            state: "Fantasy",
            postalCode: "67890",
            country: "WL"
        }
    },
    payment: {
        total: "100.00",
        currency: "USD",
        details: {
            subtotal: "75.00",
            tax: "15.00",
            shipping: "10.00"
        },
        transactions: [
            {
                id: "TXN-123", amount: "50.00", description: "Magic Potion"
            },
            { id: "TXN-456", amount: "50.00", description: "Enchanted Sword" }
        ]
    }
};

const {
    id :userID,
    name: {
        first,
        last
    },
    email,
    address: {
        shipping: {
            street :shippingStreet,
            city: shippingCity,
            state: shippingState,
            postalCode: shippingCode,
            country: shippingCountry
        },
        billing: {
            street: billingStreet,
            city: billingCity,
            state: billingState,
            postalCode: billingCode,
            country: billingCountry
        }
    },
    payment: {
        total,
        currency,
        details: {
            subtotal,
            tax,
            shipping
        },
        transactions: [
            {id , amount, description},
        ]
    }
} = user

const {payment: {transactions}} = user

function myFunction() {
    document.getElementById("personal-info").innerHTML = `<h2>Personal Information</h2>
    <ol>
    <li>ID: ${id}</li> 
    <li>First Name:${first}</li>
    <li>Second Name: ${last}</li>
    </ol>`
   
    document.getElementById("shipping-address").innerHTML = `
    <h2>Shipping</h2>
    <ol>
        <li>Street: ${shippingStreet}</li>
        <li>City: ${shippingCity}</li>
        <li>State: ${shippingState}</li>
        <li>Postal Code: ${shippingCode}</li>
        <li>Country: ${shippingCountry}</li>
    </ol>
    `
    document.getElementById("billing-address").innerHTML = `
    <h2>Billing</h2>
    <ol>
        <li>Street: ${billingStreet}</li>
        <li>City: ${billingCity}</li>
        <li>State: ${billingState}</li>
        <li>Postal Code: ${billingCode}</li>
        <li>Country: ${billingCountry}</li>
    </ol>
    `
    const transactionElement = document.getElementById("transactions");
    
    if (transactionElement) {
        transactionElement.innerHTML = `<h2>Transactions</h2>
        <ol>
            ${transactions.map(transaction => `
                <li>ID: ${transaction.id}, Amount: $${transaction.amount}, Description: ${transaction.description}</li>
            `).join('')}
        </ol>`;
    } else {
        console.error("Element with ID 'transactions' not found.");
    }
}

// console.log(transactions.map(transaction=>`${id} First Name:${amount} Second Name: ${description}`))