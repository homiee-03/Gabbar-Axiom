import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const emailSlot = document.querySelector("[data-user-email]");
const logoutButton = document.querySelector("[data-logout]");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const buyButtons = document.querySelectorAll("[data-course]");

const activateTab = (tabName) => {
  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tabName);
  });
};

if (tabButtons.length) {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tab));
  });
  activateTab(tabButtons[0].dataset.tab);
}

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const course = button.dataset.course;
    const price = button.dataset.price;
    window.location.href = `payment.html?course=${encodeURIComponent(course)}&price=${encodeURIComponent(price)}`;
  });
});

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  if (emailSlot) {
    emailSlot.textContent = user.email;
  }
});
