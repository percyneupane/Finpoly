let currentPosition = 0;
let userIncome = 0;
let spendingCategories = {
    'essentials': 0,
    'wants': 0,
    'savings': 0,
    'investment': 0,
    'short-term-savings': 0
};

window.onload = function() {
    userIncome = Number(localStorage.getItem('userIncome')); // Fetch stored income
    if (userIncome > 0) {
        document.getElementById('incomeDisplay').textContent = `$${userIncome}`;
        document.querySelector('.table').style.display = 'block';
    } else {
        alert("Income not set or invalid. Please enter your income.");
        window.location.href = 'first.html';
    }
}

function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const totalRoll = dice1 + dice2;
    document.getElementById('diceResult').innerHTML = '';
    movePawn(totalRoll);
}

function movePawn(steps) {
    const spaces = document.querySelectorAll('.space');
    currentPosition = (currentPosition + steps) % spaces.length;
    const currentSpace = spaces[currentPosition];
    const pawn = document.querySelector('.pawn');
    pawn.style.left = `${currentSpace.offsetLeft + currentSpace.offsetWidth / 2 - pawn.offsetWidth / 2}px`;
    pawn.style.top = `${currentSpace.offsetTop + currentSpace.offsetHeight / 2 - pawn.offsetHeight / 2}px`;

    setTimeout(() => promptSpending(currentSpace), 150);
}

function promptSpending(space) {
    const category = Array.from(space.classList).find(cls => ['essentials', 'wants', 'savings', 'investment', 'short-term-savings'].includes(cls));
    const categoryName = space.querySelector('.name').textContent;
    const amount = parseFloat(prompt(`You landed on ${categoryName}. How much would you like to spend?`));

    if (amount > 0 && !isNaN(amount)) {
        processSpending(category, amount);
    } else {
        alert("Please enter a valid amount greater than zero.");
    }
}

function processSpending(category, amount) {
    if (amount <= userIncome) {
        userIncome -= amount;
        document.getElementById('incomeDisplay').textContent = `$${userIncome.toFixed(2)}`;
        spendingCategories[category] += amount;
        
        if (userIncome === 0) {
            displayCategorizedSpendings();
        }
    } else {
        alert("Insufficient funds.");
    }
}
