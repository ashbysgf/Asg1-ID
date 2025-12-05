function buyTicket(name, price) {
  const cart = getCart();
  cart.push({ type: "ticket", name, price });
  saveCart(cart);
  alert(`Ticket for ${name} added to cart!`);
}

// Add event listeners to ticket buttons
document.querySelectorAll(".ticket-card button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const item = document.querySelectorAll(".ticket-card p")[index].textContent;
    const name = document.querySelectorAll(".ticket-card h2")[index].textContent;
    const price = parseFloat(item.split("$")[1]);
    buyTicket(name, price);
  });
});