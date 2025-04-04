var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { addToCart, decreaseFromCart, getCart, getTotalPrice } from "./cart";
const productList = document.getElementById("product-list");
const cartButton = document.getElementById("cart");
const quantitySpan = document.getElementById("quantity");
const filterOption = document.getElementById("genre");
const sortOption = document.getElementById("sort-year-or-pages");
const sortOrder = document.getElementById("sort-order");
const minimumYear = document.getElementById("minYear");
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:5000/api/v1/books');
    const products = yield response.json();
    console.log("Fetching products", products);
    if (!Array.isArray(products)) {
        throw new Error("Expected an array but received something else.");
    }
    products.map((product) => {
        const item = document.createElement("div");
        item.className = "product";
        item.innerHTML = `
      <div class = "image"><img src = "${product.image}"/></div>
      <h2>${product.title}</h2>
      <p>${product.year}</p>
      <p>Price: $${product.price}</p>
      <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
    `;
        productList === null || productList === void 0 ? void 0 : productList.appendChild(item);
    }).join("");
});
fetchData();
document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches(".purchase-btn")) {
        const productId = parseInt(target.dataset.id || "0");
        addToCart(productId);
        populateCartButton();
        console.log(`Product with ID ${productId} added to cart.`);
    }
});
cartButton.addEventListener("click", () => {
    displayCart();
});
const displayCart = () => {
    var _a;
    const existingModal = document.querySelector(".myModal");
    if (existingModal)
        existingModal.remove();
    const modal = document.createElement("div");
    modal.className = "myModal";
    modal.innerHTML = `<button id="close">x</button>`;
    const cartItems = getCart();
    if (cartItems.length === 0) {
        modal.innerHTML += `<p>Your Cart is Empty</p>`;
    }
    else {
        modal.innerHTML += cartItems
            .map((item) => `
          <div class = "image"><img src = "${item.image}"/></div>
          <p>${item.title} - $${item.price} - ${item.author} 
            <button class="decrease" data-id="${item.id}">-</button>
            <span> ${item.quantity} </span>
            <button class="increase" data-id="${item.id}">+</button>
          </p>`)
            .join(" ");
        modal.innerHTML += `<p id = "total-price"> The total is: ${getTotalPrice().toFixed(2)}</p>`;
    }
    document.body.appendChild(modal);
    (_a = document.getElementById("close")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        modal.remove();
    });
    modal.querySelectorAll(".increase").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const id = parseInt(event.target.dataset.id || "0");
            addToCart(id);
            displayCart();
        });
    });
    modal.querySelectorAll(".decrease").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const id = parseInt(event.target.dataset.id || "0");
            decreaseFromCart(id);
            displayCart();
        });
    });
};
const populateCartButton = () => {
    const cartItems = getCart();
    quantitySpan.textContent = cartItems.length.toString();
};
populateCartButton();
const fetchSortedBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const filterGenre = filterOption.value;
    const sortYearOrPages = sortOption.value;
    const sortAscOrDesc = sortOrder.value;
    const minYearVal = parseInt(minimumYear.value);
    const queryParams = new URLSearchParams();
    if (filterGenre !== "All")
        queryParams.append("genre", filterGenre);
    if (minYearVal)
        queryParams.append("minYear", `${minYearVal}`);
    if (sortYearOrPages)
        queryParams.append("sortBy", sortYearOrPages);
    if (sortAscOrDesc)
        queryParams.append("order", sortAscOrDesc);
    try {
        const response = yield fetch(`http://localhost:5000/api/v1/booksFilter?${queryParams.toString()}`);
        const filteredBooks = yield response.json();
        productList.innerHTML = filteredBooks
            .map((book) => `
        <div class = "products">
          <div class = "image"><img src = "${book.image}"/></div>
          <p>${book.title}</p>
          <p>${book.year}</p>
          <p>$${book.price}</p>
          <button class="purchase-btn" data-id="${book.id}">Purchase</button>
          </div>`)
            .join("");
    }
    catch (error) {
        console.error("Error fetching sorted books:", error);
    }
});
filterOption.addEventListener("change", fetchSortedBooks);
minimumYear.addEventListener("change", fetchSortedBooks);
sortOrder.addEventListener("change", fetchSortedBooks);
sortOption.addEventListener("change", fetchSortedBooks);
fetchSortedBooks();
const createBook = document.getElementById('create-book-div');
const btnCreateBook = document.getElementById('btn-create-book');
btnCreateBook.addEventListener('click', () => {
    if (createBook.style.display === 'none') {
        createBook.style.display = "block";
    }
    else {
        createBook.style.display = "none";
    }
});
(_a = document.querySelector('#postBooks')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault(); // Prevent page reload
    const formData = {
        user_id: document.getElementById("user_id").value,
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        year: document.getElementById("year").value,
        pages: document.getElementById("pages").value,
        publisher: document.getElementById("publisher").value,
        description: document.getElementById("description").value,
        image: document.getElementById("image").value,
        price: document.getElementById("price").value,
    };
    try {
        const response = yield fetch("http://localhost:5000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        console.log(response);
        const data = yield response.json();
        if (response.ok) {
            alert("Book added successfully!");
            const form = document.getElementById("postBooks");
            form.reset();
        }
        else {
            alert(`Error: ${data.error}`);
        }
    }
    catch (error) {
        console.error("Submission failed:", error);
        alert("Failed to add book.");
    }
}));
const submitButton = document.querySelector("button[type='submit']");
//# sourceMappingURL=index.js.map