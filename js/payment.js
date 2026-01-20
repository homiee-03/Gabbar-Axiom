import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const courseSlot = document.querySelector("[data-payment-course]");
const priceSlot = document.querySelector("[data-payment-price]");
const amountSlot = document.querySelector("[data-payment-amount]");
const qrSlot = document.querySelector("[data-upi-qr]");
const upiSlots = document.querySelectorAll("[data-upi-id], [data-upi-id-footer]");
const params = new URLSearchParams(window.location.search);

const course = params.get("course") || "Gaurav AI Course";
const price = params.get("price") || "₹0";
const upiId = "sauravvarmag8@oksbi";

const qrMap = {
  "₹999": {
    amount: "₹999.00",
    qr: "assets/qr-999.svg"
  },
  "₹1499": {
    amount: "₹1,499.00",
    qr: "assets/qr-1499.svg"
  },
  "₹1500": {
    amount: "₹1,500.00",
    qr: "assets/qr-1500.svg"
  },
  "₹1999": {
    amount: "₹1,999.00",
    qr: "assets/qr-1999.svg"
  }
};

const normalized = qrMap[price] || { amount: price, qr: "assets/qr-999.svg" };

if (courseSlot) courseSlot.textContent = course;
if (priceSlot) priceSlot.textContent = price;
if (amountSlot) amountSlot.textContent = normalized.amount;
if (qrSlot) qrSlot.src = normalized.qr;
upiSlots.forEach((slot) => {
  slot.textContent = upiId;
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});
