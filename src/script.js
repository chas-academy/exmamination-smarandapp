let incomes = [];
let expenses = [];

function addIncome(description, amount) {
    if (!description || isNaN(amount) || amount <= 0) {
        return;
    }
    incomes.push({ description, amount });
}

function addExpense(description, amount) {
    if (!description || isNaN(amount) || amount <= 0) {
        return;
    }
    expenses.push({ description, amount });
}

function getBalance() {
    let total = 0;
    incomes.forEach(item => total += item.amount);
    expenses.forEach(item => total -= item.amount);
    return total;
}

// Export för testerna:
module.exports = { incomes, expenses, addIncome, addExpense, getBalance };
