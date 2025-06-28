
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const transactionList = document.getElementById("transactionList");
const balanceSpan = document.getElementById("balance");


const incomes = [];
const expenses = [];
const transactions = [];

function addTransaction(type) {
  const description = descInput.value.trim();
  const amount = Number(amountInput.value);

  if (!description || isNaN(amount) || amount <= 0) {
    return;
  }

  const transaction = { description, amount, type };
  transactions.push(transaction);

  if (type === "income") {
    incomes.push(transaction);
  } else {
    expenses.push(transaction);
  }

  renderLists();
  updateBalance();

  descInput.value = "";
  amountInput.value = "";
}

function renderLists() {
  
  incomeList.innerHTML = "";
  incomes.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.description}: ${item.amount} kr`;
    incomeList.appendChild(li);
  });

  expenseList.innerHTML = "";
  expenses.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.description}: ${item.amount} kr`;
    expenseList.appendChild(li);
  });

  transactionList.innerHTML = "";
  transactions.forEach((item) => {
    const li = document.createElement("li");
    const sign = item.type === "income" ? "+" : "-";
    li.textContent = `${item.description}: ${sign}${item.amount} kr`;
    transactionList.appendChild(li);
  });
}


function updateBalance() {
  let total = 0;
  incomes.forEach((item) => total += item.amount);
  expenses.forEach((item) => total -= item.amount);
  balanceSpan.textContent = total;
}


incomeBtn.addEventListener("click", () => addTransaction("income"));
expenseBtn.addEventListener("click", () => addTransaction("expense"));

if (typeof module !== "undefined") {
  module.exports = {
    incomes,
    expenses,
    transactions,
    addTransaction,
    updateBalance,
    renderLists,
  };
}
