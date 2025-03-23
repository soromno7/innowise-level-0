import "./style.css";

const input = document.querySelector(".calculator-input");
const buttons = document.querySelectorAll(".calculator-row-item");
const themeToggle = document.getElementById('theme-toggle');
const calculator = document.querySelector('.calculator');

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === ",") {
      handleNumber(value);
    } else if (value === "AC") {
      clearInput();
    } else if (value === "±") {
      changeSign();
    } else if (value === "=") {
      calculate();
    } else {
      handleOperator(value);
    }
  });
});

themeToggle.addEventListener('change', () => {
  calculator.classList.toggle('light');
});

let currentInput = "";
let previousInput = "";
let operator = "";

function updateInput() {
  input.value = currentInput;
}

function handleNumber(number) {
  if (number === "," && currentInput.includes(",")) {
    return;
  }
  currentInput += number;
  updateInput();
}

function handleOperator(op) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

function calculate() {
  if (previousInput === "" || currentInput === "") return;

  const prev = parseFloat(previousInput.replace(",", "."));
  const current = parseFloat(currentInput.replace(",", "."));

  let result;
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      result = prev / current;
      break;
    case "%":
      result = prev % current;
      break;
    default:
      return;
  }

  currentInput = result.toString().replace(".", ",");
  operator = "";
  previousInput = "";
  updateInput();
}

function changeSign() {
  if (currentInput !== "") {
    currentInput = (parseFloat(currentInput.replace(",", ".")) * -1)
      .toString()
      .replace(".", ",");
    updateInput();
  }
}

function clearInput() {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateInput();
}


