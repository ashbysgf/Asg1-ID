document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".payment-form");

  const cardNumberInput = document.getElementById("card-number");
  const expiryInput = document.getElementById("expiry");
  const amountInput = document.getElementById("amount");

  // 1. GET TOTAL FROM CART
  const savedCart = JSON.parse(localStorage.getItem("myList")) || [];
  let total = 0;

  savedCart.forEach(item => {
    total += item.qty * 10; // $10 per item
  });

  amountInput.value = "$" + total.toFixed(2);

  // 2. LIVE FORMATTING
  // Card number formatting (1234 5678 9012 3456)
  cardNumberInput.addEventListener("input", () => {
    let val = cardNumberInput.value.replace(/\D/g, "");
    val = val.substring(0, 16);
    cardNumberInput.value = val.replace(/(.{4})/g, "$1 ").trim();
  });

  // Expiry formatting (MM/YY)
  expiryInput.addEventListener("input", () => {
    let val = expiryInput.value.replace(/\D/g, "");
    val = val.substring(0, 4);
    if (val.length >= 3) {
      expiryInput.value = val.substring(0, 2) + "/" + val.substring(2);
    } else {
      expiryInput.value = val;
    }
  });

  // Amount formatting ($xx.xx)
  amountInput.addEventListener("input", () => {
    let num = amountInput.value.replace(/[^0-9.]/g, "");
    if (num) {
      num = parseFloat(num).toFixed(2);
      amountInput.value = "$" + num;
    } else {
      amountInput.value = "";
    }
  });

  // 3. VALIDATION ON SUBMIT
    form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("card-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const cardNumber = cardNumberInput.value.replace(/\s+/g, "");
    const expiry = expiryInput.value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const amount = amountInput.value;

    if (name.length < 3) return alert("Please enter a valid name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return alert("Please enter a valid email.");
    if (!/^\d{16}$/.test(cardNumber))
      return alert("Card number must be 16 digits.");
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry))
      return alert("Expiry must be MM/YY.");
    if (!/^\d{3}$/.test(cvv))
      return alert("CVV must be 3 digits.");

    const amountNum = parseFloat(amount.replace(/[^0-9.]/g, ""));
    if (isNaN(amountNum) || amountNum <= 0)
      return alert("Invalid payment amount.");

    alert(`Payment of $${amountNum.toFixed(2)} submitted successfully!`);

    // Clear cart after payment
    localStorage.removeItem("myList");

    form.reset();
  });
});