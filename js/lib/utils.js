let buildGrid = (classname) => {

    grid = document.getElementsByClassName(classname)[0];
    let tr, td, counter = 0;

    grid.innerHTML = "";

    for (let i = 0; i <= GRID_DIMENSION; i++) {
        tr = grid.insertRow();

        for (let j = 0; j <= GRID_DIMENSION; j++) {
            td = tr.insertCell();
            
            if (i == 0){
                if (j != 0){
                    td.classList.add("row_coord");
                    td.innerText = j;
                }
            }
            else if (j == 0){
                td.classList.add("col_coord");
                td.innerText = (i + 9).toString(36).toUpperCase();
            }
            else {
                td.classList.add("cell");
                td.innerText = "";
                td.setAttribute("id", classname + "_" + counter++)

                if (classname == "gridsetter_grid"){
                    td.addEventListener("mouseover", (e) => {showShipShadow(e)});
                    td.addEventListener("click", (e) => {toggleShipSetReset(e)});
                }
            }
        }
    }
}


let setTeam = (dashboard = false) => {
    let action = "&action=team";

    fetch('./php/api_game.php?' + new URLSearchParams({
        action: "team"
    }),{method: 'GET'})
    .then(res => res.json())
    .then(data => {
        if (data.length){

            if (dashboard){
                let img = "<img src=\"./images/team_" + data[0].team + ".png\" class=\"logo\"></img>";
                document.getElementById("header").innerHTML += img;
            } else {
                let curnum = data[0].team;
                let oppnum = data[0].team == 1 ? 2 : 1; 

                let curstring = data[0].team == 1 ? "Pisani (Tu)" : "Genovesi (Tu)";
                let oppstring = data[0].team == 1 ? "Genovesi (Bot)" : "Pisani (Bot)";

                (document.getElementsByClassName("game_logo")[0]).setAttribute("src", "./images/team_" + curnum + ".png");
                (document.getElementsByClassName("game_logo")[1]).setAttribute("src", "./images/team_" + oppnum + ".png");

                (document.getElementsByClassName("game_team_player")[0]).innerText = curstring;
                (document.getElementsByClassName("game_team_enemy")[0]).innerText = oppstring;
            }
        }
    }
);
}
