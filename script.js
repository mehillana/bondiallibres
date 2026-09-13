/**
 * BondiaLlibres - Script Principal
 * Funcionalitat per a interaccio de col·leccions, personatges i PDFs
 */

/**
 * Mostra la col·leccio seleccionada i amaga les altres
 * @param {string} collectionId - ID de la col·leccio a mostrar
 * @param {Event} event - Objecte event del click
 */
function showCollection(collectionId, event) {
  event.preventDefault();
  
  // Amagar totes les col·leccions
  const collections = document.querySelectorAll('.collection');
  collections.forEach(collection => {
    collection.classList.remove('active');
  });
  
  // Mostrar la col·leccio seleccionada
  const selectedCollection = document.getElementById(collectionId);
  if (selectedCollection) {
    selectedCollection.classList.add('active');
  }
  
  // Actualitzar els botons de col·leccions
  const tabs = document.querySelectorAll('.collection-tab');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });
  event.target.classList.add('active');
}

/**
 * Mostra el personatge seleccionat i amaga els altres
 * @param {string} characterId - ID del personatge a mostrar
 */
function showCharacter(characterId) {
  // Amagar tots els personatges
  const characters = document.querySelectorAll('.character');
  characters.forEach(character => {
    character.classList.remove('active');
  });
  
  // Mostrar el personatge seleccionat
  const selectedCharacter = document.getElementById(characterId);
  if (selectedCharacter) {
    selectedCharacter.classList.add('active');
  }
  
  // Actualitzar els botons de personatges
  const tabs = document.querySelectorAll('.character-tab');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Trobar el boton corresponent i marcar-lo com active
  const triggerButton = Array.from(tabs).find(tab => {
    return tab.getAttribute('onclick').includes(characterId);
  });
  if (triggerButton) {
    triggerButton.classList.add('active');
  }
}

/**
 * Obrir un PDF en una nova finestra o tab
 * @param {string} pdfPath - Ruta del fitxer PDF
 */
function openPDF(pdfPath) {
  // Obrir el PDF en una nova finestra
  window.open(pdfPath, '_blank');
}

/**
 * Inicialitzacio del document
 */
document.addEventListener('DOMContentLoaded', function() {
  // Afegir event listeners als botons de col·leccions
  const collectionTabs = document.querySelectorAll('.collection-tab');
  collectionTabs.forEach(tab => {
    tab.addEventListener('click', function(event) {
      const collectionId = this.getAttribute('onclick')
        .match(/'([^']+)'/)[1];
      showCollection(collectionId, event);
    });
  });
  
  // Afegir event listeners als botons de personatges
  const characterTabs = document.querySelectorAll('.character-tab');
  characterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const characterId = this.getAttribute('onclick')
        .match(/'([^']+)'/)[1];
      showCharacter(characterId);
    });
  });
  
  // Afegir event listeners als botons de PDF
  const pdfButtons = document.querySelectorAll('button[onclick*="openPDF"]');
  pdfButtons.forEach(button => {
    button.addEventListener('click', function() {
      const pdfPath = this.getAttribute('onclick')
        .match(/'([^']+)'/)[1];
      openPDF(pdfPath);
    });
  });
});
