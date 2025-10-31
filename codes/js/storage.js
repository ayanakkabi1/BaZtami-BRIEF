// storage.js
const STORAGE_KEY = "transactions";

function getTransactions() {
  let data = localStorage.getItem(STORAGE_KEY);
  if (data !== null) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

function saveTransactions(list) {
  let text = JSON.stringify(list);
  localStorage.setItem(STORAGE_KEY, text);
}

function addTransaction(transaction) {
  let list = getTransactions();
  transaction.id = Date.now();
  transaction.date = new Date().toLocaleDateString("fr-FR");
  list.push(transaction);
  saveTransactions(list);
}

function deleteTransaction(id) {
  let list = getTransactions();
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].id !== id) {
      newList.push(list[i]);
    }
  }
  saveTransactions(newList);
}

function modifyTransaction(id, updatedTransaction) {
    let list = getTransactions();
    const index = list.findIndex(transaction => transaction.id === id);
   
    if (index !== -1) {
        list[index] = {
            ...list[index],
            name: updatedTransaction.name,
            description: updatedTransaction.description,
            price: updatedTransaction.price,
            type: updatedTransaction.type
        };
       
        saveTransactions(list);
        return true;
    }
    return false;
}