// STARTING_SHIPS_LIST, GRID_DIMENSION dichiarate in ./game/Player.js

let player = new Player();
let enemy = new Player();

let shipSelectedLength;
let shipOrientation;
let shipId;
let isResettingShip;

let current="player";

// ------------------------ FASE DI POSIZIONAMENTO ---------------------- //

let playbutton = document.getElementById("play_btn");
playbutton.addEventListener("click", () => {loadGridSetter()});

let loadGridSetter = () => {

    (document.getElementById("logout")).classList.add("hidden");
    (document.getElementById("header")).classList.add("hidden");
    (document.getElementById("play_section")).classList.add("hidden");
    (document.getElementById("gamelist_section")).classList.add("hidden");
    (document.getElementById("ranking_section")).classList.add("hidden");
    (document.getElementsByClassName("gridsetter_section")[0]).classList.remove("hidden");

    // utils.js
    buildGrid("gridsetter_grid");

    loadShips();
}

let loadShips = () => {
    let container = document.querySelector(".ships_container");
    let ships = "";
    let ship;
    
    container.innerHTML = "";

    for (const [i, value] of STARTING_SHIPS_LIST.entries()) {
        for (let j = 0; j < value; j++) {
            ship = "<table class=\"ship\" id=\"ship_" + i + "_" + j + "\" onclick=\"toggleShip(this,"+ (parseInt(i)+1) +")\"><tr>"
            for (let k = 0; k < i+1; k++) 
                ship += "<td></td>";    
            ship += "</tr></table>"; 
            ships += ship;
        }
        ships += "<hr style=\"width: 80%; margin: 1vh 0;\">";
    }
    container.innerHTML = ships;
}

// Seleziona o Deseleziona una Ship da posizionare sulla barca, se non già posizionata
let toggleShip = (e, length) => {
    if (e.classList.contains("ship_positioned"))
        return;

    if (isResettingShip)
        return;
    
    let ships = document.getElementsByClassName("ship");

    if (e.classList.contains("ship_selected")){
        e.classList.remove("ship_selected")
        shipSelectedLength = 0;
        shipId = null;
    } else {
        for (const ship of ships) {
            ship.classList.remove("ship_selected");
        }
        
        e.classList.add("ship_selected");
        shipSelectedLength = length;
        shipOrientation = 'h';
        shipId = e.id;
    }
}

let showShipShadow = (event) => {

    if (!shipSelectedLength)
        return;

    let index = parseInt((event.target.id).substring(16));
    let grid = document.getElementsByClassName("gridsetter_grid")[0];
    let cells = grid.getElementsByClassName("cell");
    let classname = "setship_";

    // reset griglia
    for (const cell of cells) {
        cell.classList.remove("setship_valid");
        cell.classList.remove("setship_invalid");
    }

    if (!player.getAvailability(Math.floor(index / GRID_DIMENSION), index % GRID_DIMENSION, shipSelectedLength, shipOrientation)){
        classname += "invalid";
    } else {
        classname += "valid";
    }

    // stampa nuova shadow
    for (let i = 0, count = index; i < shipSelectedLength; i++) {
        if ((shipOrientation == 'h' && ((index % GRID_DIMENSION) + i) >= GRID_DIMENSION) ||
            (shipOrientation == "v" && (Math.floor(index / GRID_DIMENSION) + i) >= GRID_DIMENSION))
            break;

        cells.item(count).classList.add(classname);

        if (shipOrientation == "h") count++;
        else count += GRID_DIMENSION;
    }
}

// Ruota la Ship selezionata
let rotateSelectedShip = () => {
    if (shipSelectedLength){
        if (shipOrientation == "h")
            shipOrientation = "v";
        else 
            shipOrientation = "h";
    }
}

// Posiziona la ship selezionata o ne seleziona una già posizionata per ripiazzarla
let toggleShipSetReset = (e) => {
    let index = parseInt((e.target.id).substring(16));
    let grid = document.getElementsByClassName("gridsetter_grid")[0];
    let cells = grid.getElementsByClassName("cell");
    let cell = cells.item(index);

    if (shipSelectedLength){
        setShip(e);
    }
    else if (cell.classList.contains("setship_ship")){
        let {length, orientation, row, column} = player.delete(Math.floor(index / GRID_DIMENSION), index % GRID_DIMENSION);
        
        isResettingShip = true;
        shipSelectedLength = length;
        shipOrientation = orientation;
        resetShip(cells, row, column);
    }
}

// Posiziona la Ship selezionata
let setShip = (e) => {
    let index = parseInt((e.target.id).substring(16));
    let grid = document.getElementsByClassName("gridsetter_grid")[0];
    let cells = grid.getElementsByClassName("cell");

    if (!shipSelectedLength || 
        cells.item(index).classList.contains("setship_invalid"))
        return;

    for (let i = 0, count = index; i < shipSelectedLength; i++) {
        cells.item(count).classList.add("setship_ship");

        if (shipOrientation == "h") count++;
        else count += GRID_DIMENSION;         
    }

    if (shipId){
        let selectedShip = document.getElementById(shipId);
        selectedShip.classList.add("ship_positioned");
    }
    
    let length = shipSelectedLength;
    shipSelectedLength = 0;
    
    player.set(Math.floor(index / GRID_DIMENSION), index % GRID_DIMENSION, length, shipOrientation);   

    if (isResettingShip) 
        isResettingShip = false;

    playSound("click");
}

// Seleziona Ship già posizionata per poterla riposizionare 
let resetShip = (cells, row, col) => {
    let index = row * GRID_DIMENSION + col;
    let count = index;

    for (let i = 0; i < shipSelectedLength; i++) {
        cells.item(count).classList.remove("setship_ship");

        if (shipOrientation == "h")
            count++;
        else 
            count += GRID_DIMENSION;
    }
}

let configureEnemy = () => {

	fetch('./php/api_game.php?' + new URLSearchParams({
            action: "config"
        }),{method: 'GET'})
        .then(res => res.json())
        .then(data => {

            for (const ship of data) {
                enemy.set(ship.row, ship.column, ship.length, ship.orientation);
            }

            if(enemy.isGridReady())
                enemy.isReadyToPlay = true;
            else 
                alert("An error occurred while bot was setting its ships");   
        }
	);

    enemy.isReadyToPlay = true;
    
    return true;
} 

let toggleGridSetterInfo = () => {
    (document.getElementsByClassName("overlay")[1]).classList.toggle("hidden");
}

// --------------------------- GAME -------------------------------

let startGame = () => {

    if (!player.isGridReady()){
        alert("Posiziona tutte le navi sul campo di battaglia!");
        return;
    } else {
        player.isReadyToPlay = true;
    }

    // configura la board del bot
    configureEnemy();

    loadRemainingShips();

    while (!player.isReadyToPlay || !enemy.isReadyToPlay) {}

    let section = document.getElementsByClassName("game_section")[0];
    section.classList.remove("hidden");

    section = document.getElementsByClassName("gridsetter_section")[0];
    section.classList.add("hidden");

    buildGameGrid("player");
    buildGameGrid("enemy");

    // lib/utils.js
    setTeam();

    turn("player", null);
}

let buildGameGrid = (team) => {
    let grid = document.getElementsByClassName(team);
    let playerGrid = document.getElementsByClassName("gridsetter_grid")[0];
    let cellsPlayer = playerGrid.getElementsByClassName("cell");
    let tr, td, counter = 0;

    grid[0].innerHTML = "";

    for (let i = 0; i <= GRID_DIMENSION; i++) {
        tr = grid[0].insertRow();

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

                if (team == "player" && cellsPlayer[counter].classList.contains("setship_ship"))
                    td.classList.add("game_ship");

                if (team == "player"){
                    td.setAttribute("id", "game_player_" + counter);
                }
                else {
                    td.setAttribute("id", "game_enemy_" + counter);
                    td.classList.add("cellhover");
                }

                td.innerText = "";

                if(team == "enemy"){
                    td.addEventListener("click", (e) => {
                        movePlayer(e.target.id);
                    });
                }
                counter++;
            }
        }
    }        
}

let loadRemainingShips = () => {
    let container = document.querySelector(".remaining_ships");
    let ships = "";
    let ship;
    
    container.innerHTML = "";

    for (const [i, value] of STARTING_SHIPS_LIST.entries()) {
        for (let j = 0; j < value; j++) {
            ship = "<table class=\"remaining_ship remaining_ship_" + (i+1) + "\"><tr>";
            for (let k = 0; k < i+1; k++) 
                ship += "<td></td>";    
            ship += "</tr></table>"; 
            ships += ship;
        }
        ships += "<hr style=\"width: 80%; margin: 1vh 0;\">";
    }
    container.innerHTML = ships;
}

let turn = (currentTeam, switchToTeam) => {

    let div, logo;

    if (switchToTeam){
        div = document.getElementsByClassName(switchToTeam+"_board");
        div[0].classList.remove("vulnerable");

        div = document.getElementsByClassName(currentTeam+"_board");
        div[0].classList.add("vulnerable");

        logo = document.getElementById("game_logo_" + currentTeam);
        logo.classList.remove("img_turn");
        
        current = switchToTeam;
    } else {
        div = document.getElementsByClassName("enemy_board");
        div[0].classList.add("vulnerable");
    }

    logo = document.getElementById("game_logo_" + current);
    logo.classList.add("img_turn");

// ------------------ BOT ---------------------
    let grid = document.getElementsByClassName("enemy")[0];
    let cells = grid.getElementsByClassName("cell");
    if (current == "player"){
        for (const cell of cells) 
            cell.classList.remove("notyourturn");
            return;
    } else {
        for (const cell of cells) 
            cell.classList.add("notyourturn");
    }

    // il bot esegue una mossa tra gli 1 e i 3 secondi 
    setTimeout(() => {
        moveEnemy();
    }, (1000 + (Math.floor(Math.random()*2))*1000));

}

let movePlayer = (id) => {
    let substr_id;
    substr_id = parseInt(id.slice(11));

    let row = Math.floor(substr_id / GRID_DIMENSION);
    let col = (substr_id % GRID_DIMENSION);
    let cell = document.getElementById(id);

    // se non è il turno del giocatore che lo richiede (cliccando)
    if (!(current == "player"))
        return;

    // se la cella è già stata cliccata in precedenza
    if (cell.classList.contains("hit") ||
        cell.classList.contains("sunk") ||
        cell.classList.contains("miss"))
        return;

    switch (enemy.fire(row, col)){
        // mancato
        case 0:
            cell.classList.add("miss");
            cell.classList.remove("cellhover");

            playSound("miss");

            turn(current, "enemy");
            break;
        // colpito
        case 1:
            cell.classList.add("hit");
            cell.classList.remove("cellhover");

            setMissedCells("enemy", row, col);
            playSound("hit");
            break;
        // affondato
        case 2:
            applySunkToShip("enemy", enemy.getShipAtCoordinates(row, col));
            cell.classList.remove("cellhover");

            // set missed cell per prima e ultima cella della nave
            setMissedCells("enemy", row, col, true);
            let tempship = enemy.getShipAtCoordinates(row, col);
            row = tempship.orientation == "h" ? row : tempship.row + tempship.length - 1;
            col = tempship.orientation == "v" ? col : tempship.column + tempship.length - 1;
            setMissedCells("enemy", tempship.row, tempship.column, true);
            setMissedCells("enemy", row, col, true);

            // remaining ships div handling
            let remainingShips = document.getElementsByClassName("remaining_ship_" + enemy.getShipAtCoordinates(row, col).length);
            let i = 0;

            while (remainingShips[i].classList.contains("rem_sunk"))
                i++;

            remainingShips[i].classList.add("rem_sunk");

            playSound("sunk");
            break;
        // vittoria
        case 3:
            applySunkToShip("enemy", enemy.getShipAtCoordinates(row, col));
            playSound("sunk", true);
            endGame("Ben fatto! Hai vinto!", 1);
            break;
    }
}

let applySunkToShip = (teamboard, ship) => {

    const {row, column, length, orientation} = ship;
    let grid = document.getElementsByClassName(teamboard)[0];
    let cells = grid.getElementsByClassName("cell");

    for (let i = 0, count = (row*GRID_DIMENSION + column); i < length; i++) {
        cells[count].classList.add("sunk");

        if (orientation == "h") count++;
        else count += GRID_DIMENSION;
    }
        
}

let setMissedCells = (curstring, row, col, isSunk = false) => {
    let tempCell;
    let grid = document.getElementsByClassName(curstring)[0];
    let cells = grid.getElementsByClassName("cell");
    
    if ((row-1) >= 0 && (col-1) >= 0){
        tempCell = cells[(row-1)*GRID_DIMENSION + (col-1)];
        tempCell.classList.add("miss");
        tempCell.classList.remove("cellhover");
    }
    
    if ((row-1) >= 0 && (col+1) < GRID_DIMENSION){
        tempCell = cells[(row-1)*GRID_DIMENSION + (col+1)];
        tempCell.classList.add("miss");
        tempCell.classList.remove("cellhover");
    }
    
    if ((row+1) < GRID_DIMENSION && (col-1) >=0 ){
        tempCell = cells[(row+1)*GRID_DIMENSION + (col-1)];
        tempCell.classList.add("miss");
        tempCell.classList.remove("cellhover");
    }
    
    if ((row+1) < GRID_DIMENSION && (col+1) < GRID_DIMENSION){
        tempCell = cells[(row+1)*GRID_DIMENSION + (col+1)];
        tempCell.classList.add("miss");
        tempCell.classList.remove("cellhover");
    }

    if (isSunk){
        if ((row-1) >= 0){
            tempCell = cells[(row-1)*GRID_DIMENSION + col];
            if (!tempCell.classList.contains("sunk")){
                tempCell.classList.add("miss");
                tempCell.classList.remove("cellhover");
            }
        }
        
        if ((col+1) < GRID_DIMENSION){
            tempCell = cells[(row)*GRID_DIMENSION + (col+1)];
            if (!tempCell.classList.contains("sunk")){
                tempCell.classList.add("miss");
                tempCell.classList.remove("cellhover");
            }
        }
        
        if ((row+1) < GRID_DIMENSION){
            tempCell = cells[(row+1)*GRID_DIMENSION + col];
            if (!tempCell.classList.contains("sunk")){
                tempCell.classList.add("miss");
                tempCell.classList.remove("cellhover");
            }
        }
        
        if ((col-1) >= 0){
            tempCell = cells[(row)*GRID_DIMENSION + (col-1)];
            if (!tempCell.classList.contains("sunk")){
                tempCell.classList.add("miss");
                tempCell.classList.remove("cellhover");
            }
        }
    }
}

let endGame = (message, result) => {

    let modal = document.getElementsByClassName("overlay")[2];
    modal.classList.remove("hidden");

    let msg = document.getElementsByClassName("endgame_message")[0];
    msg.innerText = message;

    let modalbox = document.getElementsByClassName("endgame_modal")[0];
    let res = (result) ? "endgame_win" : "endgame_defeat";
    modalbox.classList.add(res);

    // registra la partita conclusa
    storeGame(result);
}

let storeGame = (result) => {
    let obj = {
        "win": result,
        "data": []
    }
    
    let grids = ["player", "enemy"];
    let cells;
    let grid;
    let cellsRaw;
    let classes;
    let enemyGrid = enemy.getGrid();

    grids.forEach((board) => {
        grid = document.getElementsByClassName(board)[0];
        cellsRaw = grid.getElementsByClassName("cell");
        cells = [];

        for (let i = 0; i < cellsRaw.length; i++) {
            classes = cellsRaw[i].classList.value + " ";
            if (board == "enemy"){
                cellsRaw[i].classList.remove("cellhover");

                if ((enemyGrid[Math.floor(i / GRID_DIMENSION)][i % GRID_DIMENSION]).ship){
                    classes += "game_ship ";
                }
            }
            cells.push(classes);
        }

        obj.data.push(cells);
    })

    obj = JSON.stringify(obj);

    fetch('./php/api_game.php', {method: 'POST', body: obj})
	.then(res => res.json())
	.then(data => {}
	);
}

// Reset delle variabili di gioco e dell'interfaccia grafica, in vista di una nuova partita.
// Nessuna necessità di interagire con il backend
let resetGameSection = (toDashboard) => {

    // reset variabili globali
    player = new Player();
    enemy = new Player();
    shipSelectedLength = 0;
    shipOrientation = null;
    shipId = null;
    isResettingShip = 0;
    current = "player";
    
    // oscuro il modal
    (document.getElementsByClassName("overlay")[2]).classList.add("hidden");
    
    // oscuro l'interfaccia di gioco
    (document.getElementsByClassName("game_section")[0]).classList.add("hidden");
    
    // se viene fatto il redirect alla dashboard
    if (toDashboard){
        // reset interfaccia grafica
        document.getElementById("logout").classList.remove("hidden");
        document.getElementById("header").classList.remove("hidden");
        document.getElementById("play_section").classList.remove("hidden");
        document.getElementById("gamelist_section").classList.remove("hidden");
        document.getElementById("ranking_section").classList.remove("hidden");
        (document.getElementsByClassName("gridsetter_section")[0]).classList.add("hidden");
        
        // ./dashboard.js
        populateGames();
        populateRanking();
    }
    // se viene fatto il redirect ad una nuova partita
    else {
        (document.getElementsByClassName("gridsetter_section")[0]).classList.remove("hidden");
        loadGridSetter();
    }

}