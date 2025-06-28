// Hämta HTML-element
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const transactionList = document.getElementById("transactionList");
const balanceSpan = document.getElementById("balance");

// Arrayer för inkomster och utgifter
const incomes = [];
const expenses = [];
const transactions = [];

// Lägg till transaktion
function addTransaction(type) {
  const description = descInput.value.trim();
  const amount = Number(amountInput.value);

  // Validering: beskrivning måste fyllas och belopp vara ett positivt tal
  if (!description || isNaN(amount) || amount <= 0) {
    return;
  }

  const transaction = { description, amount, type };
  transactions.push(transaction);

  if (type === "income") {
    incomes.push(transaction);
  } else if (type === "expense") {
    expenses.push(transaction);
  }

  renderLists();
  updateBalance();

  // Rensa inputfält
  descInput.value = "";
  amountInput.value = "";
}

// Rendera alla listor
function renderLists() {
  // Lista för inkomster
  incomeList.innerHTML = "";
  incomes.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.description}: ${item.amount} kr`;
    incomeList.appendChild(li);
  });

  // Lista för utgifter
  expenseList.innerHTML = "";
  expenses.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.description}: ${item.amount} kr`;
    expenseList.appendChild(li);
  });

  // Lista för alla transaktioner
  transactionList.innerHTML = "";
  transactions.forEach(item => {
    const li = document.createElement("li");
    const sign = item.type === "income" ? "+" : "-";
    li.textContent = `${item.description}: ${sign}${item.amount} kr`;
    transactionList.appendChild(li);
  });
}

// Uppdatera och visa saldo
function updateBalance() {
  let total = 0;
  incomes.forEach(item => total += item.amount);
  expenses.forEach(item => total -= item.amount);
  balanceSpan.textContent = total;
}

// Eventlyssnare för knapparna
incomeBtn.addEventListener("click", () => addTransaction("income"));
expenseBtn.addEventListener("click", () => addTransaction("expense"));

// Export för tester (om testverktyg körs i Node)
if (typeof module !== "undefined") {
  module.exports = {
    incomes,
    expenses,
    transactions,
    addTransaction,
    renderLists,
    updateBalance,
  };
}
