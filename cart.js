const output = document.getElementById("cartItems");
const addBtn = document.getElementById("addButton");
const item = document.getElementById("item");
const quantity = document.getElementById("quantity");
const totalDisplay = document.getElementById("cart-total");

// display items
function displayList() {
    const saved = localStorage.getItem("myList");
    let total = 0;

    if (saved) {
        const list = JSON.parse(saved);

        output.textContent = list.map(item => {
            total += item.qty * 10;
            return `${item.name} (x${item.qty}) - $${(item.qty * 10).toFixed(2)}`;
        }).join("\n");
    } else {
        output.textContent = "";
    }

    totalDisplay.textContent = total.toFixed(2);
}

displayList();

// add item
addBtn.addEventListener("click", () => {
    const value = item.value.trim();
    const qty = parseInt(quantity.value);

    // VALIDATION SECTION
    if (value === "") {
        alert("Please enter an item name.");
        return;
    }

    if (!qty || qty < 1) {
        alert("Please enter a valid quantity (1 or more).");
        return;
    }

    if (qty > 100) {
        alert("Quantity too large! (max 100)");
        return;
    }
    
    // ---------------------------

    let list = [];
    const saved = localStorage.getItem("myList");
    if (saved) list = JSON.parse(saved);

    const existing = list.find(i => i.name.toLowerCase() === value.toLowerCase());

    if (existing) {
        existing.qty += qty;
    } else {
        list.push({ name: value, qty: qty });
    }

    localStorage.setItem("myList", JSON.stringify(list));

    item.value = "";
    quantity.value = "";

    displayList();
});