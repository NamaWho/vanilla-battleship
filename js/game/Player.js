/**
 * Contiene il numero di Ship iniziali disponibili per ogni lunghezza
 * 
 * shipList[0] contiene il numero di Ships di dimensione 1
 * shipList[1] contiene il numero di Ships di dimensione 2
 * shipList[2] contiene il numero di Ships di dimensione 3
 * shipList[3] contiene il numero di Ships di dimensione 4
 * shipList[4] contiene il numero di Ships di dimensione 5
 */
const STARTING_SHIPS_LIST = [3, 3, 2, 1, 1];
const GRID_DIMENSION = 10;

class Player {

    constructor() {
        this.shipList = null;               // array delle Ship rimanenti
        this.shipsAlive = 0;                // numero di Ship ancora in vita
        this.isReadyToPlay = false;         // bool
        this.gameGrid = Array(GRID_DIMENSION).fill().map(()=>Array(GRID_DIMENSION).fill()); // griglia di gioco
        
        this.resetGameParameters();
    }

    // Reset della griglia da gioco, della shipList e di shipsAlive
    resetGameParameters = () => {
    
        // crea in ogni cella un'istanza di Cell
        for (let i = 0; i < GRID_DIMENSION; i++) {
            for (let j = 0; j < GRID_DIMENSION; j++) {
                this.gameGrid[i][j] = new Cell();
            }
        }

        // clona l'arrary di partenza 
        this.shipList = STARTING_SHIPS_LIST.slice();
        
        // determina il numero di ship in vita (= totale, all'inizio)
        this.shipsAlive = 0;
        for (const shipNumber of this.shipList) {
            this.shipsAlive += shipNumber;
        }
    }

    // Colpisce la propria cella specificata
    fire(row, col) {
        // Il colpo ha colpito una Ship
        if (this.gameGrid[row][col].hit()) {                        
            if (this.gameGrid[row][col].ship.isSunk()) {
                this.shipsAlive--;

                // Se le Ship rimaste in vita sono 0, allora l'avversario ha vinto.
                if (this.shipsAlive == 0) {    
                    return 3;      
                }
                return 2;
            }
            return 1;
        } 

        // Il colpo non ha colpito una Ship
        return 0;
    }

    // Posiziona una Ship nella griglia da gioco
    set(row, col, length, orientation) {
        // Controlla se la Ship della lunghezza selezionata è ancora disponibile
        if (this.shipList[length - 1] > 0) {
            // Controlla se le Cell coinvolte sono ancora tutte disponibili
            if (this.getAvailability(row, col, length, orientation)) {
                
                let s = new Ship(length, orientation, row, col);

                for (let i = 0; i < length; i++) {
                    if(orientation == 'h'){
                        this.gameGrid[row][col+i].ship = s;
                    } else {
                        this.gameGrid[row+i][col].ship = s;
                    }
                }

                this.shipList[length - 1]--;
                this.setAvailability(row, col, length, orientation, false);

            }
        }
    }
    
    // Elimina la Ship (se esiste) nella cella selezionata (e in tutte quelle che la Ship occupa)
    delete(row, col) {
        if (this.gameGrid[row][col].ship == null) {
            return null;
        }
        else {
            let ship = this.gameGrid[row][col].ship;
            let colInit = ship.column;
            let rowInit = ship.row;
            let length = ship.length;
            let orientation = ship.orientation;
            
            for (let i = 0; i < length; i++) {
                if (orientation == 'h') {
                    this.gameGrid[row][colInit + i].ship = null;
                } else {
                    this.gameGrid[rowInit + i][colInit].ship = null;
                }
            }
            
            // ripristina disponibilità
            this.setAvailability(rowInit, colInit, length, orientation, true);
            // corregge eventuali disponibilità danneggiate dal ripristino precedente 
            this.setAvailabilityForAll();

            this.shipList[length - 1]++;
            return ship;
        }
    }

    // Controlla la disponibilità delle celle previste per contenere la Ship
    getAvailability(row, col, length, orientation) {
        // Controlla se la barca, con i suoi parametri, non esce dalla griglia
        if (orientation == 'h' && (col + length - 1) >= GRID_DIMENSION) return false;
        if (orientation == 'v' && (row + length - 1) >= GRID_DIMENSION) return false;

        // Controlla se una cella prevista non è disponibile
        for (let i = 0; i < length; i++) {
            if (orientation == 'h') {
                if (!this.gameGrid[row][col + i].isAvailable) return false;
            } else {
                if (!this.gameGrid[row + i][col].isAvailable) return false;
            }
        }

        return true;
    }

    // Setta la disponibilità delle celle dove è/era presente una Ship e le celle adiacenti
    setAvailability(row, col, length, orientation, available) {
        // Copertura orizzontale e verticale
        for (let i = 0; i < length; i++) {
            if (orientation == 'h') {
                // Copertura orizzontale
                if (i == 0 && col != 0){
                    this.gameGrid[row][col - 1].isAvailable = available;   
                }
                if (i == (length-1) && (col + i) != (GRID_DIMENSION -1)){
                    this.gameGrid[row][col + i + 1].isAvailable = available;
                }
                    
                this.gameGrid[row][col + i].isAvailable = available;

                // Copertura verticale
                if (row == 0)
                    this.gameGrid[row + 1][col + i].isAvailable = available;
                else if (row == (GRID_DIMENSION-1))
                    this.gameGrid[row - 1][col + i].isAvailable = available;
                else {
                    this.gameGrid[row + 1][col + i].isAvailable = available;
                    this.gameGrid[row - 1][col + i].isAvailable = available;
                }
            }
            else {
                // Copertura verticale
                if (i == 0 && row != 0) 
                    this.gameGrid[row - 1][col].isAvailable = available;
                if (i == (length-1) && (row + i) != (GRID_DIMENSION - 1))
                    this.gameGrid[row + i + 1][col].isAvailable = available;
                    
                this.gameGrid[row + i][col].isAvailable = available;

                // Copertura orizzontale
                if (col == 0)
                    this.gameGrid[row + i][col + 1].isAvailable = available;
                else if (col == (GRID_DIMENSION-1))
                    this.gameGrid[row + i][col - 1].isAvailable = available;
                else {
                    this.gameGrid[row + i][col + 1].isAvailable = available;
                    this.gameGrid[row + i][col - 1].isAvailable = available;
                }         
            }
        }

        // Copertura angoli
        if (orientation == "h"){
            if (row > 0 && col > 0)
                this.gameGrid[row-1][col-1].isAvailable = available;
            if (row > 0 && (col + length) < GRID_DIMENSION)
                this.gameGrid[row-1][col + length].isAvailable = available;
            if (row < (GRID_DIMENSION-1) && (col + length) < GRID_DIMENSION)
                this.gameGrid[row + 1][col + length].isAvailable = available;
            if (row < (GRID_DIMENSION-1) && col > 0)
                this.gameGrid[row + 1][col - 1].isAvailable = available;
        } else {
            if (row > 0 && col > 0) 
                this.gameGrid[row - 1][col - 1].isAvailable = available;
            if (row > 0 && col < (GRID_DIMENSION-1)) 
                this.gameGrid[row - 1][col + 1].isAvailable = available;
            if ((row + length) < GRID_DIMENSION && col < (GRID_DIMENSION - 1)) 
                this.gameGrid[row + length][col + 1].isAvailable = available;
            if ((row + length) < GRID_DIMENSION && col > 0)
                this.gameGrid[row + length][col - 1].isAvailable = available;
        }

    }

    setAvailabilityForAll() {
        for (let i = 0; i < GRID_DIMENSION; i++) {
            for (let j = 0; j < GRID_DIMENSION; j++) {
                let ship = this.gameGrid[i][j].ship;
                if (ship)
                    this.setAvailability(ship.row, ship.column, ship.length, ship.orientation, false);
            }    
        }
    }

    // Determina se il Player ha posizionato tutte le Ship
    isGridReady() {
        for (const shipToBeSet of this.shipList) {
            if (shipToBeSet != 0) return false;  
        }
        return true;
    }

    // Restituisce l'oggetto della clase Ship se presente alle coordinate passate per parametro
    getShipAtCoordinates(row, col){
        return this.gameGrid[row][col].ship;
    }

    getGrid(){
        return this.gameGrid;
    }


}