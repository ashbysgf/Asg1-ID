const output = document.getElementById("cartItems");
const addBtn = document.getElementById("addButton");
const item = document.getElementById("item");
const quantity = document.getElementById("quantity");
const totalDisplay = document.getElementById("cart-total"); // new

// Function to display the list directly from localStorage
function displayList() {
    const saved = localStorage.getItem("myList");
    let total = 0; // total amount

    if (saved) {
        const list = JSON.parse(saved);

        // Display items
        output.textContent = list.map(item => {
            total += item.qty * 10; // assuming price = $10 per item
            return `${item.name} (x${item.qty}) - $${(item.qty * 10).toFixed(2)}`;
        }).join("\n");
    } else {
        output.textContent = "";
    }

    // Update total display
    totalDisplay.textContent = total.toFixed(2);
}

// Load saved list on page load
displayList();

// Add new item
addBtn.addEventListener("click", () => {
    const value = item.value.trim();
    const qty = parseInt(quantity.value) || 1; // default 1 if empty or invalid

    if (value !== "") {
        let list = [];
        const saved = localStorage.getItem("myList");
        if (saved) list = JSON.parse(saved);

        // Check if item already exists
        const existing = list.find(i => i.name.toLowerCase() === value.toLowerCase());
        if (existing) {
            existing.qty += qty; // increment quantity
        } else {
            list.push({ name: value, qty: qty });
        }

        localStorage.setItem("myList", JSON.stringify(list));

        item.value = "";
        quantity.value = "";

        displayList();
    } else {
        alert("Please enter an item name.");
    }
});