// Utility functions
const utils = {
    validateNumber: (num) => !isNaN(num) && num !== null,
    formatResult: (result) => Number.isInteger(result) ? result : result.toFixed(2)
};

// Mathematical operations
const math = {
    sum: (a, b) => {
        if (!utils.validateNumber(a) || !utils.validateNumber(b)) {
            throw new Error('Invalid input: Please enter valid numbers');
        }
        return a + b;
    },
    
    lessThanOrEqualToZero: (num) => {
        if (!utils.validateNumber(num)) {
            throw new Error('Invalid input: Please enter a valid number');
        }
        return num <= 0;
    },
    
    triArea: (base, height) => {
        if (!utils.validateNumber(base) || !utils.validateNumber(height)) {
            throw new Error('Invalid input: Please enter valid numbers');
        }
        if (base <= 0 || height <= 0) {
            throw new Error('Invalid input: Dimensions must be positive');
        }
        return (base * height) / 2;
    }
};

// UI handlers
const ui = {
    init: () => {
        document.body.innerHTML = `
            <div class="container">
                <h1>Welcome to Math Helper</h1>
                <div id="userName"></div>
                <div class="buttons">
                    <button id="sumBtn">Calculate Sum</button>
                    <button id="triangleBtn">Calculate Triangle Area</button>
                </div>
                <div id="result"></div>
            </div>
        `;

        const name = prompt("Enter your name") || 'Guest';
        document.getElementById('userName').textContent = `Welcome ${name}!`;
        
        ui.attachEventListeners();
    },

    attachEventListeners: () => {
        document.getElementById('sumBtn').addEventListener('click', ui.handleSum);
        document.getElementById('triangleBtn').addEventListener('click', ui.handleTriArea);
    },

    handleSum: () => {
        try {
            const num1 = parseFloat(prompt("Enter the first number"));
            const num2 = parseFloat(prompt("Enter the second number"));
            const result = math.sum(num1, num2);
            ui.displayResult(`Sum: ${utils.formatResult(result)}`);
        } catch (error) {
            ui.displayError(error.message);
        }
    },

    handleTriArea: () => {
        try {
            const base = parseFloat(prompt("Enter base length"));
            const height = parseFloat(prompt("Enter height"));
            const area = math.triArea(base, height);
            ui.displayResult(`Triangle Area: ${utils.formatResult(area)}`);
        } catch (error) {
            ui.displayError(error.message);
        }
    },

    displayResult: (message) => {
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = message;
        resultDiv.style.color = 'green';
    },

    displayError: (message) => {
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = message;
        resultDiv.style.color = 'red';
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', ui.init);

// Add basic CSS
const style = document.createElement('style');
style.textContent = `
    .container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 1rem;
        text-align: center;
        font-family: Arial, sans-serif;
    }
    .buttons {
        margin: 1rem 0;
    }
    button {
        padding: 0.5rem 1rem;
        margin: 0.5rem;
        cursor: pointer;
    }
    #result {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 4px;
    }
`;
document.head.appendChild(style);