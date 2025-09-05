
const display = document.getElementById("display");
const keys    = document.querySelector(".keys");

let expression = "";

const append = char => {
  expression += char;
  display.value = expression;
};


 
const clear = () => {
  expression = "";
  display.value = "";
};


const calculate = () => {
  try {
    if (!expression.trim()) return;

    const result = Function(`"use strict"; return (${expression})`)();

    if (!isFinite(result)) {
      display.value = "Error";
      expression = "";
      return;
    }

    display.value = result;
    expression    = String(result); 
  } catch (err) {
    display.value = "Error";
    expression = "";
  }
};

keys.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return; 

  const key = btn.dataset.key;

  switch (key) {
    case "C":
      clear();
      break;
    case "Enter":
      calculate();
      break;
    case "Backspace":
      expression = expression.slice(0, -1);
      display.value = expression;
      break;
    default:
      append(key);
  }
});

window.addEventListener("keydown", e => {
  
  const allowed =
    "0123456789/*-+.()".split("").includes(e.key) ||
    ["Enter", "Backspace", "Escape", "Delete"].includes(e.key);

  if (!allowed) return;

  e.preventDefault();

  if (e.key === "Escape" || e.key === "Delete") {
    clear();
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
    display.value = expression;
  } else {
    append(e.key);
  }
});
