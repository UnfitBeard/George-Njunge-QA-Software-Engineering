import { addToCart, decreaseFromCart, getCart, getTotalPrice, removeFromCart } from "./cart";
import { Book, Books } from "./booksInterface";

const productList = document.getElementById("product-list") as HTMLDivElement;
const cartButton = document.getElementById("cart") as HTMLButtonElement;
const quantitySpan = document.getElementById("quantity") as HTMLSpanElement;
const filterOption = document.getElementById("genre") as HTMLSelectElement;
const sortOption = document.getElementById("sort-year-or-pages") as HTMLSelectElement;
const sortOrder = document.getElementById("sort-order") as HTMLSelectElement;
const minimumYear = document.getElementById("minYear") as HTMLInputElement;


const fetchData = async (): Promise<any> => {
  const response = await fetch('http://localhost:3000/api/booksData');
  const products: Books[] = await response.json();
  console.log("Fetching products", products);

  if (!Array.isArray(products)) {
    throw new Error("Expected an array but received something else.");
  }

  products.map((product: any) => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `
      <div class = "image"><img src = "${product.image}"/></div>
      <h2>${product.title}</h2>
      <p>${product.year}</p>
      <p>Price: $${product.price}</p>
      <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
    `;
    productList?.appendChild(item);
  }).join("");
};
fetchData()

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.matches(".purchase-btn")) {
      const productId = parseInt(target.dataset.id || "0");
      addToCart(productId);
      populateCartButton()
      console.log(`Product with ID ${productId} added to cart.`);
    }
  });


  cartButton.addEventListener("click", () => {
    displayCart();
  });

  const displayCart = () => {
    const existingModal = document.querySelector(".myModal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.className = "myModal";
    modal.innerHTML = `<button id="close">x</button>`;

    const cartItems = getCart();
    if (cartItems.length === 0) {
      modal.innerHTML += `<p>Your Cart is Empty</p>`;
    } else {
      modal.innerHTML += cartItems
        .map(
          (item) => `
          <div class = "image"><img src = "${item.image}"/></div>
          <p>${item.title} - $${item.price} - ${item.author} 
            <button class="decrease" data-id="${item.id}">-</button>
            <span> ${item.quantity} </span>
            <button class="increase" data-id="${item.id}">+</button>
          </p>`
        )
        .join(" ");
      modal.innerHTML += `<p id = "total-price"> The total is: ${getTotalPrice().toFixed(2)}</p>`
    }
    document.body.appendChild(modal);

    document.getElementById("close")?.addEventListener("click", () => {
      modal.remove();
    });


    modal.querySelectorAll(".increase").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const id = parseInt((event.target as HTMLButtonElement).dataset.id || "0");
        addToCart(id);
        displayCart();
      });
    });

    modal.querySelectorAll(".decrease").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const id = parseInt((event.target as HTMLButtonElement).dataset.id || "0");
        decreaseFromCart(id);
        displayCart();
      });
    });
  };

  const populateCartButton = (): void => {
    const cartItems = getCart();
    quantitySpan.textContent = cartItems.length.toString();
  }
  populateCartButton();

const fetchSortedBooks = async () => {
  const filterGenre = filterOption.value;
  const sortYearOrPages = sortOption.value;
  const sortAscOrDesc = sortOrder.value;
  const minYearVal = parseInt(minimumYear.value);

  const queryParams = new URLSearchParams();
  if (filterGenre !== "All") queryParams.append("genre", filterGenre)
  if (minYearVal) queryParams.append("minYear", `${minYearVal}`);
  if (sortYearOrPages) queryParams.append("sortBy", sortYearOrPages);
  if (sortAscOrDesc) queryParams.append("order", sortAscOrDesc);

  try {
    const response = await fetch(`http://localhost:5000/api/booksFilter?${queryParams.toString()}`);
    const filteredBooks = await response.json();

    productList.innerHTML = filteredBooks
      .map(
        (book: any) => `
        <div class = "products">
          <div class = "image"><img src = "${book.image}"/></div>
          <p>${book.title}</p>
          <p>${book.year}</p>
          <p>$${book.price}</p>
          <button class="purchase-btn" data-id="${book.id}">Purchase</button>
          </div>`
      )
      .join("");
  } catch (error) {
    console.error("Error fetching sorted books:", error);
  }
}
filterOption.addEventListener("change", fetchSortedBooks);
minimumYear.addEventListener("change", fetchSortedBooks);
sortOrder.addEventListener("change", fetchSortedBooks);
sortOption.addEventListener("change", fetchSortedBooks);

fetchSortedBooks();





