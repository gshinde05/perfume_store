const products = [
  { name: "Amber No. 01", price: 1899 },
  { name: "Rose Éclat", price: 2199 },
  { name: "Citrus Muse", price: 1699 },
  { name: "Velvet Oud", price: 2499 }
];
let cart = [];
const $ = (selector) => document.querySelector(selector);
const money = (amount) => "₹" + amount.toLocaleString("en-IN");
const cartOverlay = $("#cartOverlay");
const toast = $("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}
function addToCart(name, price) {
  const item = cart.find((product) => product.name === name);
  if (item) item.qty += 1;
  else cart.push({ name, price: Number(price), qty: 1 });
  renderCart();
  showToast(`${name} added to your bag`);
}
function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  $("#cartCount").textContent = count;
  $("#cartTitleCount").textContent = `(${count})`;
  $("#subtotal").textContent = money(subtotal);
  const container = $("#cartItems");
  if (!cart.length) {
    container.innerHTML = '<p class="empty-cart">Your bag is waiting for something lovely.</p>';
    return;
  }
  container.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div><h3>${escapeHtml(item.name)}</h3><p>${money(item.price)} each</p>
        <div class="qty-controls">
          <button data-action="minus" data-name="${escapeHtml(item.name)}" aria-label="Decrease quantity">−</button>
          <span>${item.qty}</span>
          <button data-action="plus" data-name="${escapeHtml(item.name)}" aria-label="Increase quantity">+</button>
          <button data-action="remove" data-name="${escapeHtml(item.name)}" aria-label="Remove item">Remove</button>
        </div>
      </div>
      <div class="cart-item-price">${money(item.price * item.qty)}</div>
    </div>`).join("");
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
function openCart() {
  cartOverlay.classList.add("open");
  cartOverlay.setAttribute("aria-hidden", "false");
}
function closeCart() {
  cartOverlay.classList.remove("open");
  cartOverlay.setAttribute("aria-hidden", "true");
}
document.querySelectorAll(".quick-add").forEach((button) => {
  button.addEventListener("click", () => addToCart(button.dataset.product, button.dataset.price));
});
$("#openCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#closeCartBackdrop").addEventListener("click", closeCart);
$("#cartItems").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const item = cart.find((product) => product.name === button.dataset.name);
  if (!item) return;
  if (button.dataset.action === "plus") item.qty += 1;
  if (button.dataset.action === "minus") item.qty -= 1;
  if (button.dataset.action === "remove" || item.qty <= 0) cart = cart.filter((product) => product.name !== button.dataset.name);
  renderCart();
});
$("#checkoutButton").addEventListener("click", () => {
  if (!cart.length) {
    showToast("Add a fragrance to your bag first");
    return;
  }
  // Replace this with your business WhatsApp number, including country code, digits only.
  const whatsappNumber = "91XXXXXXXXXX";
  const lines = cart.map((item) => `• ${item.name} × ${item.qty} — ${money(item.price * item.qty)}`);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const message = `Hello! I'd like to order from Aurelle Perfumes:\n\n${lines.join("\n")}\n\nSubtotal: ${money(total)}\nPlease confirm availability, delivery charges and payment options.`;
  if (whatsappNumber.includes("X")) {
    showToast("Add your WhatsApp number in script.js to enable ordering");
    return;
  }
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});
document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".product-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});
$("#newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  $("#newsletterMessage").textContent = "Thanks! Connect this form to an email service to collect subscribers.";
  $("#emailInput").value = "";
});
$("#menuToggle").addEventListener("click", () => $("#mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach((link) => link.addEventListener("click", () => $("#mainNav").classList.remove("open")));
$("#whatsappFooter").addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Add your WhatsApp number in script.js before launch");
});
$("#year").textContent = new Date().getFullYear();
renderCart();
