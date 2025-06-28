// Hämta HTML-element
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const transactionList = document.getElementById("transactionList");
const balanceSpan = document.getElementById("balance");

// Arrayer för inkomster, utgifter och alla transaktioner
const incomes = [];
const expenses = [];
const transactions = [];

// Lägg till en transaktion
function addTransaction(type) {
  const description = descInput.value.trim();
  const amount = Number(amountInput.value);

  // Validering: beskrivning får ej vara tom, belopp måste vara positivt tal
  if (!description || isNaN(amount) || amount <= 0) {
    return;
  }

  // Skapa transaktionsobjekt
  const transaction = { description, amount, type };

  // Lägg till i respektive listor
  transactions.push(transaction);
  if (type === "income") {
    incomes.push(transaction);
  } else {
    expenses.push(transaction);
  }

  // Uppdatera listor och saldo
  renderLists();
  updateBalance();

  // Rensa inputfält
  descInput.value = "";
  amountInput.value = "";
}

// Visa inkomster, utgifter och alla transaktioner i varsin lista
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

  // Alla transaktioner (i tidsordning)
  transactionList.innerHTML = "";
  transactions.forEach((item) => {
    const li = document.createElement("li");
    const sign = item.type === "income" ? "+" : "-";
    li.textContent = `${item.description}: ${sign}${item.amount} kr`;
    transactionList.appendChild(li);
  });
}

// Uppdatera och visa saldo
function updateBalance() {
  let total = 0;
  incomes.forEach((item) => (total += item.amount));
  expenses.forEach((item) => (total -= item.amount));
  balanceSpan.textContent = total;
}

// Eventlyssnare för knapparna
incomeBtn.addEventListener("click", () => addTransaction("income"));
expenseBtn.addEventListener("click", () => addTransaction("expense"));

// Export för tester (om testramverket kör 'node')
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
