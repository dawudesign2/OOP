import Player from './Player.js';

class Projectile extends Player {
    constructor(x, y, radius, color, velocity) {
        super(x, y, radius, color, velocity);
        this.velocity = velocity;
    }
    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

export default Projectile;