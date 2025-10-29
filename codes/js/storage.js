  // Clé pour le stockage local
        const STORAGE_KEY = 'financial_transactions';

        // Éléments du DOM
        const openPopupBtn = document.getElementById('openPopup');
        const closePopupBtn = document.getElementById('closePopup');
        const cancelBtn = document.getElementById('cancelBtn');
        const popupOverlay = document.getElementById('popupOverlay');
        const popupContainer = document.getElementById('popupContainer');
        const transactionForm = document.getElementById('transactionForm');
        const transactionsList = document.getElementById('transactionsList');
        const totalIncomeElement = document.getElementById('totalIncome');
        const totalExpensesElement = document.getElementById('totalExpenses');
        const balanceElement = document.getElementById('balance');

        // Éléments d'erreur
        const nameError = document.getElementById('nameError');
        const descriptionError = document.getElementById('descriptionError');
        const priceError = document.getElementById('priceError');
        const typeError = document.getElementById('typeError');

        // Charger les transactions au démarrage
        document.addEventListener('DOMContentLoaded', () => {
            loadTransactions();
            updateStats();
        });

        // Fonctions pour le stockage local
        function getTransactions() {
            const transactions = localStorage.getItem(STORAGE_KEY);
            return transactions ? JSON.parse(transactions) : [];
        }

        function saveTransactions(transactions) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
        }

        function addTransaction(transaction) {
            const transactions = getTransactions();
            transaction.id = Date.now(); // ID unique
            transaction.date = new Date().toLocaleDateString('fr-FR');
            transactions.push(transaction);
            saveTransactions(transactions);
            return transaction;
        }

        function deleteTransaction(id) {
            const transactions = getTransactions();
            const filteredTransactions = transactions.filter(transaction => transaction.id !== id);
            saveTransactions(filteredTransactions);
        }

        // Charger et afficher les transactions
        function loadTransactions() {
            const transactions = getTransactions();
            transactionsList.innerHTML = '';

            if (transactions.length === 0) {
                transactionsList.innerHTML = `
                    <div class="p-6 text-center text-gray-500">
                        Aucune transaction enregistrée
                    </div>
                `;
                return;
            }

            // Trier par date (plus récent en premier)
            transactions.sort((a, b) => b.id - a.id);

            transactions.forEach(transaction => {
                const transactionElement = createTransactionElement(transaction);
                transactionsList.appendChild(transactionElement);
            });
        }

        function createTransactionElement(transaction) {
            const div = document.createElement('div');
            div.className = 'p-4 fade-in';
           
            const isIncome = transaction.type === 'income';
            const amountClass = isIncome ? 'text-green-600' : 'text-red-600';
            const amountSign = isIncome ? '+' : '-';
            const typeClass = isIncome ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
            const typeText = isIncome ? 'Revenu' : 'Dépense';

            div.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                            <h3 class="font-semibold text-gray-800">${transaction.name}</h3>
                            <span class="font-bold text-lg ${amountClass} ml-4">
                                ${amountSign}${transaction.price}€
                            </span>
                        </div>
                        <p class="text-gray-600 text-sm mt-1">${transaction.description}</p>
                        <div class="flex items-center mt-2 space-x-4">
                            <span class="px-2 py-1 rounded-full text-xs font-medium ${typeClass}">
                                ${typeText}
                            </span>
                            <span class="text-gray-500 text-xs">${transaction.date}</span>
                        </div>
                    </div>
                    <button onclick="deleteTransactionHandler(${transaction.id})" class="ml-4 text-gray-400 hover:text-red-500 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            `;
           
            return div;
        }

        // Mettre à jour les statistiques
        function updateStats() {
            const transactions = getTransactions();
            let totalIncome = 0;
            let totalExpenses = 0;

            transactions.forEach(transaction => {
                const amount = parseFloat(transaction.price);
                if (transaction.type === 'income') {
                    totalIncome += amount;
                } else {
                    totalExpenses += amount;
                }
            });

            const balance = totalIncome - totalExpenses;

            totalIncomeElement.textContent = `${totalIncome.toFixed(2)}€`;
            totalExpensesElement.textContent = `${totalExpenses.toFixed(2)}€`;
            balanceElement.textContent = `${balance.toFixed(2)}€`;
            balanceElement.className = `text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`;
        }

        // Gestionnaire de suppression
        function deleteTransactionHandler(id) {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
                deleteTransaction(id);
                loadTransactions();
                updateStats();
            }
        }

        // Ouvrir le popup
        openPopupBtn.addEventListener('click', () => {
            popupOverlay.classList.remove('hidden');
            setTimeout(() => {
                popupContainer.classList.add('popup-enter-active');
            }, 10);
        });
       
        // Fermer le popup
        function closePopup() {
            popupContainer.classList.remove('popup-enter-active');
            setTimeout(() => {
                popupOverlay.classList.add('hidden');
                resetForm();
            }, 300);
        }
       
        closePopupBtn.addEventListener('click', closePopup);
        cancelBtn.addEventListener('click', closePopup);
       
        // Fermer en cliquant sur l'overlay
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
       
        // Fermer avec la touche Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
       
        // Réinitialiser le formulaire
        function resetForm() {
            transactionForm.reset();
            clearErrors();
        }
       
        // Effacer les messages d'erreur
        function clearErrors() {
            nameError.classList.add('hidden');
            descriptionError.classList.add('hidden');
            priceError.classList.add('hidden');
            typeError.classList.add('hidden');
           
            document.getElementById('name').classList.remove('border-red-500', 'ring-2', 'ring-red-200');
            document.getElementById('description').classList.remove('border-red-500', 'ring-2', 'ring-red-200');
            document.getElementById('price').classList.remove('border-red-500', 'ring-2', 'ring-red-200');
        }
       
        // Validation du formulaire
        function validateForm() {
            let isValid = true;
            const name = document.getElementById('name').value.trim();
            const description = document.getElementById('description').value.trim();
            const price = document.getElementById('price').value;
            const type = document.querySelector('input[name="type"]:checked');
           
            if (name === '') {
                nameError.classList.remove('hidden');
                document.getElementById('name').classList.add('border-red-500', 'ring-2', 'ring-red-200');
                isValid = false;
            } else {
                nameError.classList.add('hidden');
                document.getElementById('name').classList.remove('border-red-500', 'ring-2', 'ring-red-200');
            }
           
            if (description === '') {
                descriptionError.classList.remove('hidden');
                document.getElementById('description').classList.add('border-red-500', 'ring-2', 'ring-red-200');
                isValid = false;
            } else {
                descriptionError.classList.add('hidden');
                document.getElementById('description').classList.remove('border-red-500', 'ring-2', 'ring-red-200');
            }
           
            if (price === '' || parseFloat(price) <= 0 || isNaN(parseFloat(price))) {
                priceError.classList.remove('hidden');
                document.getElementById('price').classList.add('border-red-500', 'ring-2', 'ring-red-200');
                isValid = false;
            } else {
                priceError.classList.add('hidden');
                document.getElementById('price').classList.remove('border-red-500', 'ring-2', 'ring-red-200');
            }
           
            if (!type) {
                typeError.classList.remove('hidden');
                isValid = false;
            } else {
                typeError.classList.add('hidden');
            }
           
            return isValid;
        }
       
        // Gestion de la soumission du formulaire
        transactionForm.addEventListener('submit', (e) => {
            e.preventDefault();
           
            if (validateForm()) {
                const formData = new FormData(transactionForm);
                const transaction = {
                    name: formData.get('name'),
                    description: formData.get('description'),
                    price: parseFloat(formData.get('price')).toFixed(2),
                    type: formData.get('type')
                };
               
                // Ajouter au stockage local
                addTransaction(transaction);
               
                // Mettre à jour l'interface
                loadTransactions();
                updateStats();
               
                // Animation de succès
                const submitBtn = document.getElementById('submitBtn');
                submitBtn.classList.add('success-animation');
                setTimeout(() => {
                    submitBtn.classList.remove('success-animation');
                }, 500);
               
                // Fermer le popup
                setTimeout(() => {
                    resetForm();
                    closePopup();
                }, 1000);
            }
        });
       
        // Validation en temps réel
        document.getElementById('price').addEventListener('input', function() {
            if (this.value && parseFloat(this.value) > 0) {
                this.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
                priceError.classList.add('hidden');
            }
        });
       
        document.getElementById('name').addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
                nameError.classList.add('hidden');
            }
        });
       
        document.getElementById('description').addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
                descriptionError.classList.add('hidden');
            }
        });
       
        document.querySelectorAll('input[name="type"]').forEach(radio => {
            radio.addEventListener('change', function() {
                typeError.classList.add('hidden');
            });
        });

        // Exposer la fonction de suppression globalement
        window.deleteTransactionHandler = deleteTransactionHandler;
    