import Projectile from "./Projectile.js";

class Enemy extends Projectile {
    constructor(x, y, radius, color, velocity){
        super(x, y, radius, color, velocity);
    }
}

export default Enemy;