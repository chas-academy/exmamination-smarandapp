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
let incomes = [];
let expenses = [];
let transactions = [];

// Lägg till en transaktion (inkomst eller utgift)
function addTransaction(type) {
  const description = descInput.value.trim();
  const amount = Number(amountInput.value);

  // Inputvalidering – förhindra tomma eller ogiltiga värden
  if (!description || isNaN(amount) || amount <= 0) {
    // alert("Fyll i både beskrivning och ett giltigt belopp!");
    return;
  }

  // Skapa transaktionsobjekt
  const transaction = { description, amount, type };

  // Lägg till i respektive lista
  transactions.push(transaction);
  if (type === "income") {
    incomes.push(transaction);
  } else {
    expenses.push(transaction);
  }

  // Uppdatera listor och saldo
  renderLists();
  updateBalance();

  // Rensa inputfälten
  descInput.value = "";
  amountInput.value = "";
}

// Visa inkomster, utgifter och alla transaktioner i varsin lista
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

  // Alla transaktioner (i tidsordning)
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

// Export för tester (om test ramverket kör `node`)
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
