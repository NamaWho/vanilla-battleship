/**
 * Ship
 * Ogni Ship verrà inserita nella GameGrid
 */
class Ship {

    constructor(length, orientation, row, column) {
        this.length = length;
        this.orientation = orientation;
        this.row = row;
        this.column = column;
        this.lifePoints = length;
    }

    // Controlla se la Ship è posizionata sulla griglia
    isPositioned = () => {
        return (this.row >= 0 && this.column >= 0);
    }

    // Stabilisce se la barca è affondata
    isSunk() {
        return this.lifePoints == 0;
    }
    
    // Toglie una vita alla Ship
    hit() {
        if (this.lifePoints - 1 >= 0) 
            --this.lifePoints;
    }

}