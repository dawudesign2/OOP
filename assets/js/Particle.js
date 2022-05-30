import Enemy from "./Enemy.js";

//On cible le canvas avec l id "game-container"
const canvas = document.querySelector('#game-container');
// on crée un objet de type CanvasRenderingContext2D qui permet de dessiner sur le canvas
const ctx = canvas.getContext('2d');

//Mettez les dimensions de la toile égales aux dimensions de la fenêtre
canvas.width = innerWidth;
canvas.height = innerHeight;

class Particle extends Enemy {
    constructor(x, y, radius, color, velocity){
        super(x, y, radius, color, velocity);
        this.alpha = 1;
    }

    draw(){
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
       
    }

    updated() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01;
    }
}

export default Particle;