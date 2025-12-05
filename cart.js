// Get cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart back to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
      image: image
    });
  }

  saveCart();
  alert("Item added to cart!");
}

// Display cart items
function loadCart() {
  const container = document.getElementById("cart-list");
  const totalBox = document.getElementById("cart-total");

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalBox.innerText = "$0.00";
    return;
  }

  cart.forEach((item, index) => {
    const cost = item.price * item.quantity;
    total += cost;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" class="cart-img">
        <div class="cart-info">
          <h2>${item.name}</h2>
          <p>$${item.price.toFixed(2)}</p>

          <label>Quantity:</label>
          <input type="number" min="1" value="${item.quantity}"
            onchange="updateQuantity(${index}, this.value)">

          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  totalBox.innerText = "$" + total.toFixed(2);
}

// Update quantity
function updateQuantity(index, qty) {
  cart[index].quantity = parseInt(qty);
  saveCart();
  loadCart();
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  loadCart();
}