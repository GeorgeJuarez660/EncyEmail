const names_definitions = document.querySelector('.third_piece');
let n_def = [];
const jsonData = '/static/json/names_definitions.json';

//fetching data from json file
const getData = async()=>{
    try{//response
        let response = await fetch(jsonData);
        let data = await response.json();
        console.log(data)
        data.names.forEach(n => n_def.push(n));
        //DOM
        renderDefinitions(n_def);

    }catch(err){
        if(err) console.log(err);
    }
}

//Run function
getData()

//It loops the array and gets the values inside the DOM
const renderDefinitions = (arr) => {
    names_definitions.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
        names_definitions.innerHTML += `
        <div class="definition" data-top="${i}">
            <button class="box" id="${arr[i].codex}" onclick="">
                <img src="${arr[i].img}" alt="${arr[i].name}" class="picture">
                <p class="title">${arr[i].name}</p>
            </button>           
        </div>
        `
    }
}