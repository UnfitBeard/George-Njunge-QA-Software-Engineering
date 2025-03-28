import { products } from "./products";
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
export function addToCart(id) {
    const product = products.find((p) => String(p.id) === String(id));
    if (product) {
        const existingProduct = cart.find((item) => String(item.id) === String(id));
        if (existingProduct) {
            existingProduct.quantity = (existingProduct.quantity || 1) + 1;
        }
        else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartStorage();
        console.log(`Added ${product.title} to cart.`);
    }
}
export function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]") || [];
}
export function removeFromCart(id) {
    cart = getCart().filter((item) => String(item.id) !== String(id));
    updateCartStorage();
}
export function decreaseFromCart(id) {
    const existingProduct = cart.find((item) => String(item.id) === String(id));
    if ((existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.quantity) !== undefined) {
        if (existingProduct.quantity >= 1) {
            existingProduct.quantity = (existingProduct.quantity) - 1;
        }
        else {
            cart = getCart().filter((item) => String(item.id) !== String(id));
        }
        updateCartStorage();
        console.log(`Removed ${existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.title} from cart.`);
    }
}
// export function changeNumberOfUnit(id: number, amount: number) {
//   let cart = getCart();
//   const productIndex = cart.findIndex((item) => String(item.id) === String(id));
//   if (productIndex !== -1 && cart[productIndex]) {  // Ensure product exists
//     cart[productIndex].quantity = (cart[productIndex].quantity || 1) + amount;
//     if (cart[productIndex].quantity <= 0) {
//       cart.splice(productIndex, 1);
//     }
//     updateCartStorage();
//   }
// }
export function clearCart() {
    cart = [];
    updateCartStorage();
}
export function getTotalPrice() {
    return getCart().reduce((total, item) => total + item.price * (item.quantity || 1), 0);
}
export function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
//# sourceMappingURL=cart.js.map