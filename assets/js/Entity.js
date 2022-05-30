//On cible le canvas avec l id "game-container"
const canvas = document.querySelector('#game-container');
// on crée un objet de type CanvasRenderingContext2D qui permet de dessiner sur le canvas
const ctx = canvas.getContext('2d');

//Mettez les dimensions de la toile égales aux dimensions de la fenêtre
canvas.width = innerWidth;
canvas.height = innerHeight;



class Entity {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw() {  
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

export default Entity;