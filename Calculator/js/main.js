const inputDisplay = document.getElementById("input");
const buttons = document.querySelectorAll(".btn");
let inputValue = "";
let operator = null;
let firstInput = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        if (button.classList.contains("numbers")) {
            setNumber(value);
        } else if (button.classList.contains("operations")) {
            CalcOperation(value);
        }
    });
});

function setNumber(value) {
    if (inputValue === "0" && value !== ".") {
        inputValue = value;
    } else {
        inputValue += value;
    }
    updateDisplay();
}

function CalcOperation(value) {
    if (value === "AC") {
        resetCalculator();
    } else if (value === "DEL") {
        inputValue = inputValue.slice(0, -1) || "0";
        updateDisplay();
    } else if (value === "=") {
        if (firstInput !== null && operator !== null) {
            const result = calculate(firstInput, parseFloat(inputValue), operator);
            inputValue = result.toString();
            operator = null;
            firstInput = null;
            updateDisplay();
        }
    } else {
        if (operator !== null) {
            firstInput = calculate(firstInput, parseFloat(inputValue), operator);
        } else {
            firstInput = parseFloat(inputValue);
        }
        operator = value;
        inputValue = "0";
    }
}

function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        case "%":
            return a % b;
        default:
            return b;
    }
}

function updateDisplay() {
    inputDisplay.textContent = inputValue;
}

function resetCalculator() {
    inputValue = "0";
    operator = null;
    firstInput = null;
    updateDisplay();
}