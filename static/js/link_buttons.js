//Linking of Menu

let button_open_menupane = document.getElementById('menu_btn'); //menu button

//let button_close_menupane = document.getElementById('close_lateral'); //close button

button_open_menupane.onclick = function (){ //if I click the menu button it connects to the anonymous variable and the menu_pane2 opens
    document.getElementById('ee_menu').classList.add('open');

}

/*button_close_menupane.onclick = function (){ //if I click the X button it connects to the anonymous variable and menu_pane2 opens
    document.getElementById('ee_menu').classList.remove('open');
}*/