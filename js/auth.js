import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const form = document.querySelector("[data-auth-form]");
const message = document.querySelector("[data-auth-message]");
const mode = form?.dataset.mode;

const showMessage = (text, tone = "") => {
  if (!message) return;
  message.textContent = text;
  message.style.color = tone === "success" ? "var(--success)" : "var(--muted)";
};

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = form.querySelector("#email").value.trim();
    const password = form.querySelector("#password").value;

    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      window.location.href = "dashboard.html";
    } catch (error) {
      showMessage(error.message || "Authentication failed. Please try again.");
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (user && (mode === "login" || mode === "signup")) {
    window.location.href = "dashboard.html";
  }
});
