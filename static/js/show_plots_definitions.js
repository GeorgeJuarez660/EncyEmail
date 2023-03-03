function show_definitions(ID){

    let defintion_selected = ID;

    let  xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhttp.responseText);

            let plots = response.plots;

            let title = '';

            let photo_plot = '';

            let pre_plot = '';

            let history = '';

            for (let element of plots) {

                console.log(plots);

                if (defintion_selected == element.id) {

                    title += `<h2 class="title">${element.title}</h2>`

                    photo_plot += ``

                    pre_plot += ``

                    history += ``
                }
            }

            let res_title = document.getElementById("def_title");

            let res_pp = document.getElementById("flex_section");

            let res_prep = document.getElementById("footer");

            let res_history = document.getElementById("casty")

            res_title.innerHTML = title;

            res_pp.innerHTML = photo_plot;

            res_prep.innerHTML = pre_plot;

            res_history.innerHTML = history;

        }
    };

    xhttp.open("GET", "/static/json/plots_definitions.json", true);
    xhttp.send();

}