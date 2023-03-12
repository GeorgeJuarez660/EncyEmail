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
        renderNames(n_def);

    }catch(err){
        if(err) console.log(err);
    }
}

//Run function
getData()

//It loops the array and gets the values inside the DOM
const renderNames = (arr) => {
    names_definitions.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
        names_definitions.innerHTML += `
        <div class="definition" data-top="${i}">
            <button class="box" id="${arr[i].id}" onclick="show_definitions(this.id); move_right();" data-target="definitions">
                <img src="${arr[i].img}" alt="${arr[i].name}" class="picture">
                <p class="title">${arr[i].name}</p>
            </button>           
        </div>
        `
    }
}