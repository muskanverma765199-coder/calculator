const previousOperandText = document.getElementById('previous-operand');
const currentOperandText = document.getElementById('current-operand');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

function clearScreen() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === '0') return;
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.toString().slice(0, -1);
    }
    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function chooseOperator(selectedOperation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    shouldResetScreen = true;
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '−':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert("Cannot divide by zero");
                clearScreen();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    // Floating-point math problem solution (e.g. 0.1 + 0.2)
    currentOperand = Math.round(computation * 1e12) / 1e12;
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

function updateDisplay() {
    currentOperandText.innerText = currentOperand;
    if (operation != null) {
        previousOperandText.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandText.innerText = '';
    }
}

// Keyboard Controls Layout
window.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault(); 
        compute();
    }
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearScreen();
    if (e.key === '+') chooseOperator('+');
    if (e.key === '-') chooseOperator('−');
    if (e.key === '*') chooseOperator('×');
    if (e.key === '/') {
        e.preventDefault(); 
        chooseOperator('÷');
    }
});