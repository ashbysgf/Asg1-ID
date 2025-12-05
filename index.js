// Get elements
const popup = document.getElementById("newsletterPopup");
const closeBtn = document.getElementById("closePopup");
const subscribeBtn = document.getElementById("subscribeBtn");
const emailInput = document.getElementById("newsletterEmail");
const message = document.getElementById("popupMessage");

// Show popup after 2 seconds (or immediately if you prefer)
window.addEventListener("load", () => {
    setTimeout(() => {
        popup.style.display = "flex";
    }, 2000);
});

// Close popup when clicking X
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Subscribe button
subscribeBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (email) {
        alert(`Thank you! ${email} has been subscribed.`);
        message.textContent = "You are now subscribed!";
        message.style.color = "green";
        emailInput.value = ""; // Clear input
        popup.style.display = "none"; // Close popup
    } else {
        alert("Please enter a valid email address.");
    }
});

// Optional: click outside popup to close
window.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});