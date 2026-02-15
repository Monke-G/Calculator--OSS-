const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let input = "";

/* Update Display */
function updateDisplay() {
  display.textContent = input || "0";
}

/* Button Click Handling */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) {
      handleInput(value);
    }

    if (action === "clear") {
      input = "";
      updateDisplay();
      display.classList.add("reset");
      setTimeout(() => display.classList.remove("reset"), 150);
    }

    if (action === "delete") {
      input = input.slice(0, -1);
      updateDisplay();
    }

    if (action === "equals") {
      calculate();
    }
  });
});

/* Handle Input */
function handleInput(value) {
  if (value === "." && input.endsWith(".")) return;
  input += value;
  updateDisplay();
}

/* Calculate */
function calculate() {
  try {
    const result = eval(input);
    input = result.toString();
    updateDisplay();
  } catch {
    input = "";
    display.textContent = "Error";
  }
}

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
  if ("0123456789+-*/.%()".includes(e.key)) {
    handleInput(e.key);
  }
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") {
    input = input.slice(0, -1);
    updateDisplay();
  }
  if (e.key.toLowerCase() === "c") {
    input = "";
    updateDisplay();
  }
});

/* Intersection Observer for Instructions Pop */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll(".pop").forEach(card => observer.observe(card));
