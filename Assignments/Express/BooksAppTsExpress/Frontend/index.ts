import { products } from "./products";
import { addToCart, decreaseFromCart, getCart, getTotalPrice, removeFromCart } from "./cart";
import { Book } from "./booksInterface";

const productList = document.getElementById("product-list") as HTMLDivElement;
const cartButton = document.getElementById("cart") as HTMLButtonElement;
const quantitySpan = document.getElementById("quantity") as HTMLSpanElement;

const fetchData = () => {
  console.log("Fetching products", products);
  products.forEach((product) => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `
      <div class = "image"><img src = "${product.image}"/></div>
      <h2>${product.title}</h2>
      <p>Price: $${product.price}</p>
      <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
    `;
    productList?.appendChild(item);
  });
};
fetchData();

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
      modal.innerHTML+=` <p id = "total-price"> The total is: ${getTotalPrice().toFixed(2)}</p>`
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

const sortBooks = (products: Book[]) => {
  const filterOption = document.getElementById("genre") as HTMLSelectElement;
  const sortOption = document.getElementById("sort-year-or-pages") as HTMLSelectElement;
  const sortOrder = document.getElementById("sort-order") as HTMLSelectElement;
  const minimumYear = document.getElementById("minYear") as HTMLInputElement;

  const updateBooks = () => {
    const filterGenre = filterOption.value;
    const sortYearOrPages = sortOption.value;
    const sortAscOrDesc = sortOrder.value;
    const minYearVal = parseInt(minimumYear.value);

    let filteredBooks = [...products];

    if (filterGenre !== "All" && filterGenre) {
      filteredBooks = filteredBooks.filter((book) => book.genre === filterGenre);
    }
    
    if (!isNaN(minYearVal)) {
      filteredBooks = filteredBooks.filter((book) => book.year > minYearVal);
    }
    
    filteredBooks.sort((book1, book2) => {
      let comparison = 0;
      if (sortYearOrPages === "Years") {
        comparison = book1.year - book2.year;
      } else if (sortYearOrPages === "Pages") {
        comparison = book1.pages - book2.pages;
      }
      return sortAscOrDesc === "Descending" ? -comparison : comparison;
    });

    productList.innerHTML = filteredBooks
      .map(
        (book) => `
        <div class = "products">
          <div class = "image"><img src = "${book.image}"/></div>
          <p>${book.title}</p>
          <p>$${book.price}</p>
          <button class="purchase-btn" data-id="${book.id}">Purchase</button>
          </div>`
      )
      .join("");
  };
  
  updateBooks();

  filterOption.addEventListener("change", updateBooks);
  minimumYear.addEventListener("change", updateBooks);
  sortOrder.addEventListener("change", updateBooks);
  sortOption.addEventListener("change", updateBooks);
};

sortBooks(products);

const populateCartButton = ():void => {
  const cartItems = getCart();
  quantitySpan.textContent = cartItems.length.toString();
}
populateCartButton();
