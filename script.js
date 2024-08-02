// Add an event listener to the finance form to handle form submission
document
  .getElementById("finance-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (description && !isNaN(amount)) {
      const entry = { description, amount, type };

      const entries = JSON.parse(localStorage.getItem("entries")) || [];
      entries.push(entry);

      localStorage.setItem("entries", JSON.stringify(entries));

      updateFinanceList();
      updateSummary();

      document.getElementById("description").value = "";
      document.getElementById("amount").value = "";
    } else {
      alert("Please enter a valid description and amount.");
    }
  });

function updateFinanceList() {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  const list = document.getElementById("finance-list"); 
  list.innerHTML = ""; 

  entries.forEach((entry, index) => {
    const item = document.createElement("li");
    item.className = entry.type;

    item.textContent = `${entry.description}: $${entry.amount.toFixed(2)}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      entries.splice(index, 1);
      localStorage.setItem("entries", JSON.stringify(entries));
      updateFinanceList();
      updateSummary();
    });

    item.appendChild(deleteButton);
    list.appendChild(item);
  });
}

function updateSummary() {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  let totalIncome = 0;
  let totalExpenses = 0;

  entries.forEach((entry) => {
    if (entry.type === "income") {
      totalIncome += entry.amount;
    } else {
      totalExpenses += entry.amount;
    }
  });

  document.querySelector(
    ".total-income"
  ).textContent = `Total Income: $${totalIncome.toFixed(2)}`;
  document.querySelector(
    ".total-expenses"
  ).textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
  document.querySelector(
    ".remaining-budget"
  ).textContent = `Remaining Budget: $${(totalIncome - totalExpenses).toFixed(
    2
  )}`;
}

updateFinanceList();
updateSummary();
