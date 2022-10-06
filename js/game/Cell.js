/**
 * Cell
 * Ogni Cell compone la Game Grid (griglia di gioco), e può contenere una Ship
 * (se è stata piazzata). Il valore isHit determina se la cella è stata colpita 
 */
class Cell {
    
    constructor() {
        this.isHit = false;
        this.isAvailable = true;
        this.ship = null;
    }
    
    isHit() { return this.isHit; }
    
    // Colpisce la Cell e restituisce l'esito del colpo
    hit() {
        if (this.ship != null) {
            this.isHit = true;
            this.ship.hit();
            return true;
        } else 
            return false;
    }

}