const jsonDisplay2 = document.getElementById('show_sc2');

fetch('/static/json/plots_definitions.json')
  .then(response => response.json())
  .then(data => {
    //Display the contents of the JSON file in the text field
    jsonDisplay2.textContent = JSON.stringify(data, null, 2);
  })
  .catch(error => {
    console.error('Errore nel recuperare il file JSON:', error);
  });
