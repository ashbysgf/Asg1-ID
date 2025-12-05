function addToCart(name, price) {
  const cart = getCart();
  cart.push({ type: "merch", name, price });
  saveCart(cart);
  alert(`${name} added to cart!`);
}

// Add event listeners to merch buttons
document.querySelectorAll(".merch-item button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const item = document.querySelectorAll(".merch-item p")[index].textContent;
    const name = item.split("—")[0].trim();
    const price = parseFloat(item.split("$")[1]);
    addToCart(name, price);
  });
});