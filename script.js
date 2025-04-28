
// LocalStorage থেকে কাউন্ট রিড
let count = localStorage.getItem("count")
  ? parseInt(localStorage.getItem("count"))
  : 0;

// অডিও সাউন্ড
const clickSound = new Audio('audio/notification.mp3');

function increase() {
  count++;
  updateCounter();
  clickSound.play();
}

function decrease() {
  count--;
  updateCounter();
  clickSound.play();
}

function reset() {
  count = 0;
  updateCounter();
  clickSound.play();
}

function updateCounter() {
  const counter = document.getElementById("count");
  const message = document.getElementById("message");
  counter.innerText = count;

  // স্মুথ স্কেল
  counter.style.transform = "scale(1.2)";
  setTimeout(() => {
    counter.style.transform = "scale(1)";
  }, 150);

  // মেসেজ চেক
  if (count >= 100) {
    message.innerText = "You reached 100!";
  } else if (count < 0) {
    message.innerText = "Negative Value!";
  } else {
    message.innerText = "";
  }

  // LocalStorage এ কাউন্ট সেভ
  localStorage.setItem("count", count);
}

function toggleMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  const modeButton = document.getElementById("modeToggle");

  // বাটনের টেক্সট আপডেট
  modeButton.innerText = isDark
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";

  // থিম LocalStorage এ সেভ
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function setInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  const modeButton = document.getElementById("modeToggle");
  const hour = new Date().getHours();

  if (savedTheme) {
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      modeButton.innerText = "Switch to Light Mode";
    }
  } else {
    // ইউজার কিছু সেভ না করলে রাতের ৭টার পর অটো ডার্ক
    if (hour >= 19 || hour < 6) {
      document.body.classList.add("dark");
      modeButton.innerText = "Switch to Light Mode";
    }
  }
}

// শুরুতেই থিম ঠিক করা
setInitialTheme();
updateCounter();
