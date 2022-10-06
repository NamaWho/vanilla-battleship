let rowCellHit;
let colCellHit;
let orientCellHit;
let counterMiss = 0;
let startingCellHitCol;
let startingCellHitRow;

let moveEnemy = () => {
    let randRow, randCol, orientation;

    // se non è stata ancora colpita nessuna parte della nave
    if (!(rowCellHit) && (rowCellHit !== 0)){
        randRow = Math.floor(Math.random()*10);
        randCol = Math.floor(Math.random()*10); 
    } else {
        [randRow, randCol, orientation] = generateCoordinates();
    }

    let id = randRow * GRID_DIMENSION + randCol;
    let cell = document.getElementById("game_player_" + id);

    if (cell.classList.contains("hit") ||
        cell.classList.contains("sunk") ||
        cell.classList.contains("miss")){

        // se conosco l'orientamento della barca ma non sto colpendo significa che potenzialmente sono in fondo alla nave
        // dal momento che l'offset di spostamento è randomico (o -1 o +1), potrei generare sempre il solito. 
        // per questo è stato impostato un contatore che nel peggiore dei casi testa la stessa generazione 15 volte, dunque
        // si "arrende" e torna alla prima cella colpita, provando nell'altra direzione 
        if (orientCellHit){
            counterMiss++;
        }

        // se sono arrivato a fine nave ma non ho affondato
        // significa che devo andare dalla parte opposta rispetto alla cella da dove sono partito
        if ((rowCellHit >= 0) && orientCellHit && counterMiss == 15){  
            rowCellHit = startingCellHitRow;
            colCellHit = startingCellHitCol;
            counterMiss = 0;
        }
        moveEnemy();
        return;
    }

    switch (player.fire(randRow, randCol)){
        case 0:
            cell.classList.add("miss");

            turn(current, "player");
            playSound("miss", true);
            break;
        case 1:
            cell.classList.add("hit");
            
            if (!(rowCellHit) && (rowCellHit !== 0)){
                startingCellHitRow = randRow;
                startingCellHitCol = randCol;
            }
            rowCellHit = randRow;
            colCellHit = randCol;
            orientCellHit = orientation;

            setMissedCells("player", randRow, randCol);
            playSound("hit", true);
            setTimeout(() => {
                moveEnemy();
            }, (1000 + (Math.floor(Math.random()*2))*1000));
            break;
        case 2:
            applySunkToShip("player", player.getShipAtCoordinates(randRow, randCol));
            rowCellHit = null;
            colCellHit = null;
            orientCellHit = null;
            startingCellHitRow = null;
            startingCellHitCol = null;

            // set missed cell per cella colpita, prima cella e ultima cella della nave
            setMissedCells("player", randRow, randCol, true);
            let tempship = player.getShipAtCoordinates(randRow, randCol);
            randRow = tempship.orientation == "h" ? randRow : tempship.row + tempship.length - 1;
            randCol = tempship.orientation == "v" ? randCol : tempship.column + tempship.length - 1;
            setMissedCells("player", tempship.row, tempship.column, true);
            setMissedCells("player", randRow, randCol, true);

            playSound("sunk", true);
            setTimeout(() => {
                moveEnemy();
            }, (1000 + (Math.floor(Math.random()*2))*1000));
            break;
        case 3:
            applySunkToShip("player", player.getShipAtCoordinates(randRow, randCol));
            playSound("sunk", true);
            endGame("Oh no! Hai perso!", 0);
            break;
    }
} 

// Genera indirizzi random con offset di 1 rispetto alla cella colpita in precedenza
let generateCoordinates = () => {
    let orientation;
    
    // genera indici fino a che non sono validi
    do {
        // se esiste già un orientamento viene ripreso, altrimenti ne viene scelto uno randomicamente 
        orientation = orientCellHit ? orientCellHit : (Math.floor(Math.random()*2)+1);
        switch (orientation) {
            case 1: // orizzontale
                randRow = rowCellHit;
                // genera una nuova colonna (+ o - 1 rispetto a quella attuale) dove potersi spostare
                do {
                    randCol = colCellHit + (Math.floor(Math.random()*3) - 1);
                } while (randCol == colCellHit);
                break;
            case 2: // verticale
                randCol = colCellHit;
                do {
                    randRow = rowCellHit + (Math.floor(Math.random()*3) - 1);
                } while (randRow == rowCellHit);
                break;
        }
    } while (randRow >= 10 || randRow <= -1 || randCol >= 10 || randCol <= -1);

    return [randRow, randCol, orientation];
}