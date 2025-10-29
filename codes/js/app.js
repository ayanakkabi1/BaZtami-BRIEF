// Éléments du DOM
const openPopupBtn = document.getElementById('openPopup');
const closePopupBtn = document.getElementById('closePopup');
const cancelBtn = document.getElementById('cancelBtn');
const popupOverlay = document.getElementById('popupOverlay');
const popupContainer = document.getElementById('popupContainer');
const transactionForm = document.getElementById('transactionForm');
const preview = document.getElementById('preview');
const previewContent = document.getElementById('previewContent');

// Éléments de formulaire
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const typeRadios = document.querySelectorAll('input[name="type"]');

// Éléments d'erreur
const nameError = document.getElementById('nameError');
const descriptionError = document.getElementById('descriptionError');
const priceError = document.getElementById('priceError');
const typeError = document.getElementById('typeError');

// Vérification que tous les éléments existent
function validateElements() {
    const elements = {
        openPopupBtn, closePopupBtn, cancelBtn, popupOverlay, 
        popupContainer, transactionForm, preview, previewContent,
        nameInput, descriptionInput, priceInput, nameError,
        descriptionError, priceError, typeError
    };
    
    for (const [name, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`Élément non trouvé: ${name}`);
            return false;
        }
    }
    return true;
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    if (!validateElements()) {
        console.error('Certains éléments du DOM sont manquants');
        return;
    }
    
    initializeEventListeners();
});

function initializeEventListeners() {
    // Ouvrir le popup
    openPopupBtn.addEventListener('click', openPopup);
    
    // Fermer le popup
    closePopupBtn.addEventListener('click', closePopup);
    cancelBtn.addEventListener('click', closePopup);
    
    // Fermer en cliquant sur l'overlay
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Gestion de la soumission du formulaire
    transactionForm.addEventListener('submit', handleFormSubmit);
    
    // Validation en temps réel
    priceInput.addEventListener('input', function() {
        const value = this.value;
        if (value && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
            hideError(priceError, priceInput);
        }
    });
    
    nameInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(nameError, nameInput);
        }
    });
    
    descriptionInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(descriptionError, descriptionInput);
        }
    });
    
    typeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            typeError.classList.add('hidden');
        });
    });

    // Empêcher la soumission avec Enter dans les champs numériques
    priceInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
}

// Fermer avec la touche Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !popupOverlay.classList.contains('hidden')) {
        closePopup();
    }
});

// Ouvrir le popup
function openPopup() {
    popupOverlay.classList.remove('hidden');
    // Forcer le reflow pour l'animation
    void popupOverlay.offsetWidth;
    popupContainer.classList.add('popup-enter-active');
    // Focus sur le premier champ
    setTimeout(() => nameInput.focus(), 100);
}

// Fermer le popup
function closePopup() {
    popupContainer.classList.remove('popup-enter-active');
    setTimeout(() => {
        popupOverlay.classList.add('hidden');
        resetForm();
    }, 300);
}

// Réinitialiser le formulaire
function resetForm() {
    transactionForm.reset();
    clearErrors();
    hidePreview();
}

// Effacer les messages d'erreur
function clearErrors() {
    const errorElements = [nameError, descriptionError, priceError, typeError];
    const inputElements = [nameInput, descriptionInput, priceInput];
    
    errorElements.forEach(error => error.classList.add('hidden'));
    inputElements.forEach(input => {
        input.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
    });
}

// Cacher la prévisualisation
function hidePreview() {
    preview.classList.add('hidden');
}

// Validation du formulaire
function validateForm() {
    let isValid = true;
    const name = nameInput.value.trim() || '';
    const description = descriptionInput.value.trim() || '';
    const price = priceInput.value || '';
    const type = document.querySelector('input[name="type"]:checked');
    
    // Validation du nom
    if (name === '') {
        showError(nameError, nameInput);
        isValid = false;
    } else {
        hideError(nameError, nameInput);
    }
    
    // Validation de la description
    if (description === '') {
        showError(descriptionError, descriptionInput);
        isValid = false;
    } else {
        hideError(descriptionError, descriptionInput);
    }
    
    // Validation du prix
    const priceValue = parseFloat(price);
    if (price === '' || isNaN(priceValue) || priceValue <= 0) {
        showError(priceError, priceInput);
        isValid = false;
    } else {
        hideError(priceError, priceInput);
    }
    
    // Validation du type
    if (!type) {
        typeError.classList.remove('hidden');
        isValid = false;
    } else {
        typeError.classList.add('hidden');
    }
    
    return isValid;
}

// Afficher une erreur
function showError(errorElement, inputElement) {
    errorElement.classList.remove('hidden');
    inputElement.classList.add('border-red-500', 'ring-2', 'ring-red-200');
}

// Cacher une erreur
function hideError(errorElement, inputElement) {
    errorElement.classList.add('hidden');
    inputElement.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
}

// Gestion de la soumission du formulaire
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        const formData = new FormData(transactionForm);
        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')).toFixed(2),
            type: formData.get('type')
        };
        
        showPreview(data);
        showSuccessAnimation();
        
        // Simulation d'envoi des données
        setTimeout(() => {
            resetForm();
            closePopup();
            // Ici vous pouvez ajouter l'appel API pour sauvegarder la transaction
            console.log('Transaction soumise:', data);
        }, 1000);
    }
}

// Afficher l'animation de succès
function showSuccessAnimation() {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.classList.add('success-animation');
    setTimeout(() => {
        submitBtn.classList.remove('success-animation');
    }, 500);
}

// Afficher la prévisualisation
function showPreview(data) {
    const typeText = data.type === 'income' ? 'Revenu' : 'Dépense';
    const typeClass = data.type === 'income' 
        ? 'text-green-600 bg-green-100' 
        : 'text-red-600 bg-red-100';
    const amountClass = data.type === 'income' ? 'text-green-600' : 'text-red-600';
    const amountSymbol = data.type === 'income' ? '+' : '-';
    
    previewContent.innerHTML = `
        <div class="flex justify-between items-start">
            <div>
                <h4 class="font-bold text-lg text-gray-800">${escapeHtml(data.name)}</h4>
                <p class="text-gray-600 mt-1">${escapeHtml(data.description)}</p>
            </div>
            <span class="font-bold text-xl ${amountClass}">
                ${amountSymbol}${data.price}€
            </span>
        </div>
        <div class="flex justify-between items-center mt-4">
            <span class="px-3 py-1 rounded-full text-sm font-medium ${typeClass}">
                ${typeText}
            </span>
            <span class="text-gray-500 text-sm">Ajouté maintenant</span>
        </div>
    `;
    
    preview.classList.remove('hidden');
}

// Échapper le HTML pour la sécurité
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}