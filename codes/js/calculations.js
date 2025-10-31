// calcul.js
function calculateStats(transactions) {
    let income = 0;
    let expenses = 0;

    transactions.forEach(t => {
        const amount = parseFloat(t.price);
        if (t.type === 'income') {
            income += amount;
        } else {
            expenses += amount;
        }
    });

    const balance = income - expenses;

    return {
        totalIncome: income.toFixed(2),
        totalExpenses: expenses.toFixed(2),
        balance: balance.toFixed(2),
        isPositive: balance >= 0
    };
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value;
    const type = document.querySelector('input[name="type"]:checked');

    const errors = {};

    if (!name) errors.name = 'Nom requis';
    if (!description) errors.description = 'Description requise';
    if (!price || parseFloat(price) <= 0) errors.price = 'Montant positif requis';
    if (!type) errors.type = 'Type requis';

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors,
        data: {
            name,
            description,
            price: parseFloat(price).toFixed(2),
            type: type ? type.value : null
        }
    };
}