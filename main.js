
let expenses = [];

let editIndex = "";

if (sessionStorage.getItem("expenses")) {

    expenses = JSON.parse(
        sessionStorage.getItem("expenses")
    );

    displayExpense();
}


// Add and Update Expense

ExpenseForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const expenseNameInput = Expname.value;
    const accountNameInput = Account.value;
    const categoryNameInput = Expcategory.value;
    const expenseDateInput = date.value;


    // Check validation

    if (
        expenseNameInput &&
        accountNameInput &&
        categoryNameInput &&
        expenseDateInput
    ) {

        if (editIndex === "") {

            expenses.push({

                expensename: expenseNameInput,
                accountname: accountNameInput,
                categoryname: categoryNameInput,
                expensedate: expenseDateInput

            });

        }

        else {

            expenses[editIndex] = {

                expensename: expenseNameInput,
                accountname: accountNameInput,
                categoryname: categoryNameInput,
                expensedate: expenseDateInput

            };

        }

        editIndex = "";

        sessionStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );

        displayExpense();

        ExpenseForm.reset();

    }

    else {

        alert("Please fill the form completely");

    }

});


// Display Expenses

function displayExpense() {

    expenseTable.innerHTML = "";

    expenses.forEach((expense, index) => {

        expenseTable.innerHTML += `

            <tr>

                <th>${index + 1}</th>

                <td>${expense.expensename}</td>

                <td>${expense.accountname}</td>

                <td>${expense.categoryname}</td>

                <td>${expense.expensedate}</td>

                <td>

                    <button
                        onclick="editExpense(${index})"
                        class="btn btn-warning">

                        Edit

                    </button>

                    <button
                        onclick="deleteExpense(${index})"
                        class="btn btn-danger">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}


// Edit Expense

function editExpense(expenseIndex) {

    const expenseDetails = expenses[expenseIndex];

    Expname.value = expenseDetails.expensename;

    Account.value = expenseDetails.accountname;

    Expcategory.value = expenseDetails.categoryname;

    date.value = expenseDetails.expensedate;

    editIndex = expenseIndex;

    console.log("Edit Expense", expenseDetails);

}


// Delete Expense

function deleteExpense(expenseIndex) {

    if (confirm("Are you sure you want to delete this expense?")) {

        expenses.splice(expenseIndex, 1);

        sessionStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );

        displayExpense();

    }

}


// Search Expense using find()

search.addEventListener("input", () => {

    const searchValue = search.value.toLowerCase();

    expenseTable.innerHTML = "";

    if (searchValue === "") {

        displayExpense();

        return;

    }

    const expenseDetails = expenses.find((expense) => {

        return expense.categoryname.toLowerCase().includes(searchValue);

    });

    if (expenseDetails) {

        const index = expenses.indexOf(expenseDetails);

        expenseTable.innerHTML += `

            <tr>

                <th>${index + 1}</th>

                <td>${expenseDetails.expensename}</td>

                <td>${expenseDetails.accountname}</td>

                <td>${expenseDetails.categoryname}</td>

                <td>${expenseDetails.expensedate}</td>

                <td>

                    <button
                        onclick="editExpense(${index})"
                        class="btn btn-warning">

                        Edit

                    </button>

                    <button
                        onclick="deleteExpense(${index})"
                        class="btn btn-danger">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    }

    else {

        expenseTable.innerHTML = `

            <tr>

                <td colspan="6" class="text-center">

                    No Expense Found

                </td>

            </tr>

        `;

    }

});
