
// storage.js
// 1. On crée une variable pour la clé du stockage
const STORAGE_KEY = "transactions";

// 2. Fonction pour lire les transactions
function getTransactions() {
  // on lit les données depuis le localStorage
  let data = localStorage.getItem(STORAGE_KEY);

  // si on a trouvé des données
  if (data !== null) {
    // on les transforme en tableau²
    return JSON.parse(data);
  } else {
    // sinon on renvoie un tableau vide
    return [];
  }
}

// 3. Fonction pour sauvegarder les transactions
function saveTransactions(list) {
  // on transforme le tableau en texte JSON
  let text = JSON.stringify(list);
  // on l’enregistre dans le localStorage
  localStorage.setItem(STORAGE_KEY, text);
}

// 4. Fonction pour ajouter une transaction
function addTransaction(transaction) {
  // on récupère toutes les transactions existantes
  let list = getTransactions();

  // on crée un id et une date pour la nouvelle transaction
  transaction.id = Date.now();
  transaction.date = new Date().toLocaleDateString("fr-FR");

  // on ajoute la nouvelle transaction à la liste
  list.push(transaction);

  // on sauvegarde le tout
  saveTransactions(list);
}

// 5. Fonction pour supprimer une transaction
function deleteTransaction(id) {
  let list = getTransactions();

  // on garde seulement les transactions dont l'id est différent
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].id !== id) {
      newList.push(list[i]);
    }
  }

  // on sauvegarde la nouvelle liste
  saveTransactions(newList);
}
// 6. Fonction pour modifier une transaction
// 6. Fonction pour modifier une transaction
function modifyTransaction(id, updatedTransaction) {
    let list = getTransactions();
   
    // Trouver l'index de la transaction à modifier
    const index = list.findIndex(transaction => transaction.id === id);
   
    if (index !== -1) {
        // Garder l'ID et la date originale, mettre à jour les autres champs
        list[index] = {
            ...list[index],
            name: updatedTransaction.name,
            description: updatedTransaction.description,
            price: updatedTransaction.price,
            type: updatedTransaction.type
        };
       
        // Sauvegarder la liste mise à jour
        saveTransactions(list);
        return true;
    }
    return false;
}

