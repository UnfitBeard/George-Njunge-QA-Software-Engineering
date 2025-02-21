let cart = []; 

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/books");
    const bookData = await response.json();
    sortBooks(bookData); // Sort books based on filter criteria
  } catch (error) {
    console.error(error.message);
  }
};
fetchData();

const addToCart = (bookId, bookTitle, bookPrice) => {
  const bookInCart = cart.find((book) => String(book.id) === String(bookId));
  if (bookInCart) {
    bookInCart.quantity += 1; 
  } else {
    cart.push({ id: bookId, title: bookTitle, price: bookPrice, quantity: 1 });
  }
  updateCart();
};

const removeFromCart = (bookId) => {
  const bookInCart = cart.find((book) => String(book.id) === String(bookId));
  if (bookInCart && bookInCart.quantity > 1) {
    bookInCart.quantity -= 1;
  } else if (bookInCart && bookInCart.quantity === 1) {
    cart = cart.filter((book) => book.id !== bookId);
  }

  updateCart();
};

const deleteFromCart = (bookId) => {
  cart = cart.filter((book) => String(book.id) !== String(bookId)); 

  updateCart();
};


function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}


const updateCart = () => {
  const cartButton = document.getElementById("items-in-cart");
  const cartItemsDiv = document.getElementById("cart-items");

  const totalItems = cart.reduce((total, book) => total + book.quantity, 0);
  cartButton.innerHTML = totalItems;

  if (totalItems === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartItemsDiv.innerHTML = cart
      .map(
        (book) =>
          `<div>
            <p>${book.title} - $${book.price} : <span id="quantity-${book.id}">${book.quantity}</span></p>
            <button onclick="addToCart(${book.id}, '${book.title}', ${book.price})">Add</button>
            <button onclick="removeFromCart(${book.id})">Remove</button>
            <button onclick="deleteFromCart(${book.id})">Delete</button>
          </div>`
      )
      .join("");
  }

  const totalPrice = cart.reduce((total, book) => total + book.price * book.quantity, 0);
  document.getElementById("total-price").innerText = totalPrice.toFixed(2); // Display total price with two decimals
};
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("purchase-btn")) {
    const bookId = e.target.getAttribute("data-id");
    const bookTitle = e.target.getAttribute("data-title");
    const bookPrice = parseFloat(e.target.getAttribute("data-price"));
    addToCart(bookId, bookTitle, bookPrice); 
  }
});

const sortBooks = (data) => {
  const filterOption = document.getElementById("sort-year-or-pages");
  const genreFilter = document.getElementById("genre");
  const sortOrder = document.getElementById("sort-order"); 

  const updateBooks = () => {
    const selectedSort = filterOption.value;
    const selectedGenre = genreFilter.value; 
    const selectedOrder = sortOrder.value; 

    let filteredBooks = [...data];

    if (selectedGenre !== "All" && selectedGenre) {
      filteredBooks = filteredBooks.filter((book) => book.genre === selectedGenre); 
    }

    filteredBooks = filteredBooks.sort((book1, book2) => {
      let comparison = 0;

      if (selectedSort === "Pages") {
        comparison = book1.pages - book2.pages;
      } else if (selectedSort === "Years") {
        comparison = book1.year - book2.year;
      }

      if (selectedOrder === "Descending") {
        comparison = -comparison;
      }

      return comparison;
    });

    document.querySelector(".data").innerHTML = filteredBooks
      .map(
        (book) =>
          `<p>📖 ${book.title} by ${book.author} - ${book.genre} (${book.pages} pages) - ${book.year}
          <img src="${book.image}">
          <button class="purchase-btn" data-id="${book.id}" data-title="${book.title}" data-price="${book.price}">Purchase</button></p>`
      )
      .join("");
  };

  updateBooks();

  filterOption.addEventListener("change", updateBooks); 
  genreFilter.addEventListener("change", updateBooks); 
  sortOrder.addEventListener("change", updateBooks); 
};

const modalContent = document.getElementById("cart-items");

const cartModalHTML = `
  <div id="cart-items">
    <!-- Cart items will be displayed here -->
  </div>
  <div>
    <p>Total: $<span id="total-price">0.00</span></p>
  </div>
`;

if (!document.getElementById("cart-modal")) {
  const modalDiv = document.createElement("div");
  modalDiv.setAttribute("id", "cart-modal");
  modalDiv.innerHTML = cartModalHTML;
  document.body.appendChild(modalDiv);
}
