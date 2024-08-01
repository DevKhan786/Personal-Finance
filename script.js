// Add an event listener to the finance form to handle form submission
document
  .getElementById("finance-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior to handle it with JavaScript

    // Retrieve values from the input fields
    const description = document.getElementById("description").value; // Get the description from the input field
    const amount = parseFloat(document.getElementById("amount").value); // Get the amount and convert it to a floating-point number
    const type = document.getElementById("type").value; // Get the type (income or expense) from the dropdown

    // Check if the description is not empty and amount is a valid number
    if (description && !isNaN(amount)) {
      // Create an entry object containing the description, amount, and type
      const entry = { description, amount, type };

      // Retrieve existing entries from localStorage, or initialize an empty array if none exist
      const entries = JSON.parse(localStorage.getItem("entries")) || [];
      entries.push(entry); // Add the new entry to the entries array

      // Store the updated entries array back in localStorage
      localStorage.setItem("entries", JSON.stringify(entries));
      
      // Update the finance list and summary display
      updateFinanceList();
      updateSummary();

      // Clear the input fields after submission
      document.getElementById("description").value = "";
      document.getElementById("amount").value = "";
    } else {
      // Show an alert if the input is invalid
      alert("Please enter a valid description and amount.");
    }
  });

// Function to update the finance list in the UI
function updateFinanceList() {
  // Retrieve the entries from localStorage
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  const list = document.getElementById("finance-list"); // Get the list element in the HTML
  list.innerHTML = ""; // Clear the existing list content

  // Iterate over each entry and create a list item for it
  entries.forEach((entry, index) => {
    const item = document.createElement("li"); // Create a list item element
    item.className = entry.type; // Add class for type-based styling (income or expense)

    // Set the text content with the entry details
    item.textContent = `${entry.description.toUpperCase()}: $${entry.amount.toFixed(2)}`;

    // Create a delete button for each entry
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete"; // Set the button text
    deleteButton.addEventListener("click", () => {  
      // When delete button is clicked, remove the entry from the list
      entries.splice(index, 1); // Remove the entry at the current index
      localStorage.setItem("entries", JSON.stringify(entries)); // Update localStorage with the modified entries array
      updateFinanceList(); // Update the list display
      updateSummary(); // Update the summary display
    });

    item.appendChild(deleteButton); // Add the delete button to the list item
    list.appendChild(item); // Add the list item to the list
  });
}

// Function to update the financial summary display
function updateSummary() {
  // Retrieve the entries from localStorage
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  let totalIncome = 0; // Initialize total income
  let totalExpenses = 0; // Initialize total expenses
  
  // Calculate total income and expenses
  entries.forEach((entry) => {
    if (entry.type === "income") {
      totalIncome += entry.amount; // Add to total income if entry is income
    } else {
      totalExpenses += entry.amount; // Add to total expenses if entry is expense
    }
  });

  // Update the summary elements in the UI
  document.querySelector(
    ".total-income"
  ).textContent = `Total Income: $${totalIncome.toFixed(2)}`; // Display total income
  document.querySelector(
    ".total-expenses"
  ).textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`; // Display total expenses
  document.querySelector(
    ".remaining-budget"
  ).textContent = `Remaining Budget: $${(totalIncome - totalExpenses).toFixed(
    2
  )}`; // Display remaining budget
}

// Initialize the app by updating the list and summary when the page loads
updateFinanceList();
updateSummary();
