const jsonDisplay = document.getElementById('show_sc');

fetch('/static/json/definitions.json')
  .then(response => response.json())
  .then(data => {
    // Visualizza il contenuto del file JSON nel campo di testo
    jsonDisplay.textContent = JSON.stringify(data, null, 2);
  })
  .catch(error => {
    console.error('Errore nel recuperare il file JSON:', error);
  });
