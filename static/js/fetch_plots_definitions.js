const plots_definitions = document.querySelector('.third_piece');
let p_def = [];
const jsonData2 = '/static/json/plots_definitions.json';

//fetching data from json file
const getData2 = async()=>{
    try{//response
        let response = await fetch(jsonData2);
        let data = await response.json();
        console.log(data)
        data.plots.forEach(p => p_def.push(p));
        //DOM
        renderPlots(p_def);

    }catch(err){
        if(err) console.log(err);
    }
}

//Run function
getData2()

//It loops the array and gets the values inside the DOM
const renderPlots = (arr) => {
    plots_definitions.innerHTML = '';

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