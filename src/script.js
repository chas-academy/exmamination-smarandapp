// Hämta alla HTML-element
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

  // Validering: inget tomt, bara positiva tal
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

  // Rensa input
  descInput.value = "";
  amountInput.value = "";
}

// Rendera listor
function renderLists() {
  // Inkomster
  incomeList.innerHTML = "";
  incomes.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.description}: ${item.amount} kr`;
    incomeList.appendChild(li);
  });

  // Utgifter
  expenseList.innerHTML = "";
  expenses.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.description}: ${item.amount} kr`;
    expenseList.appendChild(li);
  });

  // Alla transaktioner
  transactionList.innerHTML = "";
  transactions.forEach((item) => {
    const li = document.createElement("li");
    const sign = item.type === "income" ? "+" : "-";
    li.textContent = `${item.description}: ${sign}${item.amount} kr`;
    transactionList.appendChild(li);
  });
}

// Uppdatera saldo
function updateBalance() {
  let total = 0;
  incomes.forEach((item) => total += item.amount);
  expenses.forEach((item) => total -= item.amount);
  balanceSpan.textContent = total;
}

// Eventlyssnare
incomeBtn.addEventListener("click", () => addTransaction("income"));
expenseBtn.addEventListener("click", () => addTransaction("expense"));

// Export för tester (om testramverk körs)
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
