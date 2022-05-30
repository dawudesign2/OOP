import Entity from "./Entity.js";

class Player extends Entity {
    constructor(x, y, radius, color) {
        super(x, y, radius);
        this.color = color;
    }
}


export default Player;