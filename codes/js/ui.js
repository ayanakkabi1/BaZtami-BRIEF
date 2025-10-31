// ui.js
let ui = {
    editingId: null, // Ajouter cette propriété pour suivre l'ID en cours d'édition

    init() {
        this.loadElements();
        this.setupEvents();
        this.loadData();
    },

    loadElements() {
        // Éléments principaux
        this.openPopupBtn = document.getElementById("openPopup");
        this.closePopupBtn = document.getElementById("closePopup");
        this.cancelBtn = document.getElementById("cancelBtn");
        this.popupOverlay = document.getElementById("popupOverlay");
        this.popupContainer = document.getElementById("popupContainer");
        this.transactionForm = document.getElementById("transactionForm");
        this.transactionsList = document.getElementById("transactionsList");
        this.totalIncome = document.getElementById("totalIncome");
        this.totalExpenses = document.getElementById("totalExpenses");
        this.balance = document.getElementById("balance");
    },

    setupEvents() {
        // Ouvrir popup
        this.openPopupBtn.addEventListener("click", () => {
            this.editingId = null; // Réinitialiser l'édition
            this.resetForm();
            this.openPopup();
        });

        // Fermer popup
        this.closePopupBtn.addEventListener("click", () => this.closePopup());
        this.cancelBtn.addEventListener("click", () => this.closePopup());

        // Fermer en cliquant dehors
        this.popupOverlay.addEventListener("click", (e) => {
            if (e.target === this.popupOverlay) this.closePopup();
        });

        // Fermer avec Echap
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this.closePopup();
        });

        // Soumission formulaire
        this.transactionForm.addEventListener("submit", (e) => this.submitForm(e));
    },

    openPopup() {
        this.popupOverlay.classList.remove("hidden");
        setTimeout(() => {
            this.popupContainer.classList.add("popup-enter-active");
        }, 10);
    },

    closePopup() {
        this.popupContainer.classList.remove("popup-enter-active");
        setTimeout(() => {
            this.popupOverlay.classList.add("hidden");
            this.resetForm();
            this.editingId = null; // Réinitialiser l'édition
        }, 300);
    },

    submitForm(e) {
        e.preventDefault();

        const validation = validateForm();

        if (validation.isValid) {
            if (this.editingId) {
                // Mode modification
                this.updateTransaction(this.editingId, validation.data);
            } else {
                // Mode ajout
                addTransaction(validation.data);
            }
            this.loadData();
            this.showSuccess();
            setTimeout(() => {
                this.resetForm();
                this.closePopup();
                this.editingId = null;
            }, 1000);
        } else {
            this.showErrors(validation.errors);
        }
    },

    updateTransaction(id, transactionData) {
        if (modifyTransaction(id, transactionData)) {
            console.log("Transaction modifiée avec succès");
        } else {
            alert("Erreur lors de la modification");
        }
    },

    modifyTransaction(id) {
        // Récupère la transaction à modifier
        const transactions = getTransactions();
        const transaction = transactions.find(t => t.id === id);
       
        if (!transaction) {
            alert("Transaction non trouvée");
            return;
        }
       
        // Remplir le formulaire avec les données existantes
        document.getElementById("name").value = transaction.name;
        document.getElementById("description").value = transaction.description;
        document.getElementById("price").value = transaction.price;
       
        // Sélectionner le bon type (income ou expense)
        if (transaction.type === 'income') {
            document.getElementById("income").checked = true;
        } else {
            document.getElementById("expense").checked = true;
        }
       
        // Stocker l'ID de la transaction en cours de modification
        this.editingId = id;
       
        // Changer le texte du bouton
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.textContent = "Modifier la transaction";
        submitBtn.classList.remove("bg-indigo-600", "hover:bg-indigo-700");
        submitBtn.classList.add("bg-blue-600", "hover:bg-blue-700");
       
        // Ouvrir le popup
        this.openPopup();
    },

    showErrors(errors) {
        // Cacher toutes les erreurs d'abord
        this.hideAllErrors();

        // Afficher les erreurs
        for (const field in errors) {
            const errorElement = document.getElementById(field + "Error");
            const inputElement = document.getElementById(field);

            if (errorElement && inputElement) {
                errorElement.textContent = errors[field];
                errorElement.classList.remove("hidden");
                inputElement.classList.add("border-red-500");
            }
        }
    },

    hideAllErrors() {
        const fields = ["name", "description", "price", "type"];
        fields.forEach((field) => {
            const errorElement = document.getElementById(field + "Error");
            const inputElement = document.getElementById(field);

            if (errorElement) errorElement.classList.add("hidden");
            if (inputElement) inputElement.classList.remove("border-red-500");
        });
    },

    resetForm() {
        this.transactionForm.reset();
        this.hideAllErrors();
       
        // Réinitialiser le bouton
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.textContent = "Valider";
        submitBtn.classList.remove("bg-blue-600", "hover:bg-blue-700");
        submitBtn.classList.add("bg-indigo-600", "hover:bg-indigo-700");
       
        this.editingId = null;
    },

    loadData() {
        this.updateTransactions();
        this.updateStats();
    },

    updateTransactions() {
        const transactions = getTransactions();
        const list = this.transactionsList;

        list.innerHTML = "";

        if (transactions.length === 0) {
            list.innerHTML =
                '<div class="text-center text-gray-500 py-8">Aucune transaction enregistrée</div>';
            return;
        }

        // Trier par date (plus récent en premier)
        transactions
            .sort((a, b) => b.id - a.id)
            .forEach((transaction) => {
                const div = document.createElement("div");
                div.className = "p-4 border rounded-lg fade-in";

                const isIncome = transaction.type === "income";
                const bgColor = isIncome
                    ? "bg-green-100 border-green-300"
                    : "bg-red-100 border-red-200";
                const textColor = isIncome ? "text-green-600" : "text-red-600";
                const sign = isIncome ? "+" : "-";

                div.innerHTML = `
                    <div class="flex justify-between items-center ${bgColor} p-4 rounded-lg">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-800">${transaction.name}</h3>
                            <p class="text-gray-600 text-sm mt-1">${transaction.description}</p>
                            <span class="text-xs text-gray-500">${transaction.date}</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold text-lg ${textColor}">${sign}${transaction.price} MAD</span>
                            <button onclick="ui.deleteTransaction(${transaction.id})" class="text-gray-400 hover:text-red-500">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                            <button onclick="ui.modifyTransaction(${transaction.id})" class="text-gray-400 hover:text-blue-500">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                `;

                list.appendChild(div);
            });
    },

    updateStats() {
        const transactions = getTransactions();
        const stats = calculateStats(transactions);

        this.totalIncome.textContent = stats.totalIncome + " MAD";
        this.totalExpenses.textContent = stats.totalExpenses + " MAD";
        this.balance.textContent = stats.balance + " MAD";

        // Changer la couleur du solde
        this.balance.className = stats.isPositive
            ? "text-2xl font-bold text-blue-600"
            : "text-2xl font-bold text-red-600";
    },

    deleteTransaction(id) {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette transaction ?")) {
            deleteTransaction(id);
            this.loadData();
        }
    },

    showSuccess() {
        const btn = document.getElementById("submitBtn");
        btn.classList.add("success-animation");
        setTimeout(() => {
            btn.classList.remove("success-animation");
        }, 500);
    },
};

// Démarrer l'application quand la page est chargée
document.addEventListener("DOMContentLoaded", () => {
    ui.init();
});