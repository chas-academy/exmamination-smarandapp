/* ========= Budget- och utgiftskoll ========= */
/*   Fungerar i både webbläsare och Jest/JSDOM  */

/* ---------- Data ---------- */
const incomes  = [];   // inkomster:  { description, amount }
const expenses = [];   // utgifter:   { description, amount }

/* ---------- Initiera när DOM finns ---------- */
function init() {
  /* 1. Hämta element */
  const descInput  = document.getElementById("desc");
  const amountInput= document.getElementById("amount");
  const incomeBtn  = document.getElementById("incomeBtn");
  const expenseBtn = document.getElementById("expenseBtn");
  const incomeList = document.getElementById("incomeList");
  const expenseList= document.getElementById("expenseList");
  const balanceEl  = document.getElementById("balance");

  /* Skydd om testmiljön inte satt upp DOM korrekt */
  if (!descInput || !amountInput || !incomeBtn || !expenseBtn ||
      !incomeList || !expenseList || !balanceEl) return;

  /* 2. Lägg till transaktion */
  function addTransaction(type) {
    const description = descInput.value.trim();
    const amount      = Number(amountInput.value);

    /* Grundvalidering */
    if (!description || isNaN(amount) || amount <= 0) return;

    const obj = { description, amount };
    (type === "income" ? incomes : expenses).push(obj);

    renderLists();
    updateBalance();

    descInput.value = "";
    amountInput.value = "";
  }

  /* 3. Rendera listor */
  function renderLists() {
    incomeList.innerHTML  = "";
    expenseList.innerHTML = "";

    incomes.forEach(t => {
      const li = document.createElement("li");
      li.textContent = `${t.description} - ${t.amount} kr (Inkomst)`;
      incomeList.appendChild(li);
    });

    expenses.forEach(t => {
      const li = document.createElement("li");
      li.textContent = `${t.description} - ${t.amount} kr (Utgift)`;
      expenseList.appendChild(li);
    });
  }

  /* 4. Uppdatera saldo */
  function updateBalance() {
    const total =
      incomes .reduce((s, t) => s + t.amount, 0) -
      expenses.reduce((s, t) => s + t.amount, 0);

    balanceEl.textContent = total;
  }

  /* 5. Eventlyssnare */
  incomeBtn .addEventListener("click", () => addTransaction("income"));
  expenseBtn.addEventListener("click", () => addTransaction("expense"));
}

/* ----- Starta init beroende på readyState ----- */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();                         // JSDOM / redan laddad
}

/* ----- Export för Jest/Node (valfritt) ----- */
if (typeof module !== "undefined") {
  module.exports = { incomes, expenses };
}
