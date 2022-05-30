
import Player from "./Player.js";
import Projectile from "./Projectile.js";
import Particle from "./Particle.js";
import Enemy from "./Enemy.js";
//On cible le canvas avec l id "game-container"
const canvas = document.querySelector('#game-container');
// on crée un objet de type CanvasRenderingContext2D qui permet de dessiner sur le canvas
const ctx = canvas.getContext('2d');

//Mettez les dimensions de la toile égales aux dimensions de la fenêtre
canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.getElementById("scoreEl");
const startGameBtn = document.getElementById("startGameBtn");
const modalEl = document.getElementById("modalEl");
const bigScoreEl = document.getElementById("bigScoreEl");


let player = new Player(canvas.width / 2, canvas.height / 2, 10, "white");
let projectiles = [];
let enemies = [];
let particles = [];

function init() {
    player = new Player(canvas.width / 2, canvas.height / 2, 10, "white");
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEl.innerText = score;
    bigScoreEl.innerText = score;
}


function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (50 - 20) + 20;

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        const color = `rgb(${r}, ${g}, ${b})`;

        const randomValue = Math.random();
        let x, y;
        if (randomValue < 0.25) {
            x = 0 - radius;
            y = Math.random() * canvas.height;
        } else if (randomValue >= 0.25 && randomValue < 0.5) {
            x = canvas.width + radius;
            y = Math.random() * canvas.height;
        } else if (randomValue >= 0.5 && randomValue < 0.75) {
            x = Math.random() * canvas.width;
            y = 0 - radius;
        } else if (randomValue >= 0.75) {
            x = Math.random() * canvas.width;
            y = canvas.height + radius;
        }

        const angle = Math.atan2(player.y - y, player.x - x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        }

        enemies.push(new Enemy(x, y, radius, color, velocity));

    }, 1000);
}


let animationId;
let score = 0;

function animate () {
    animationId = requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.draw();

    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        } else {
          particle.update();
        }
      });

    projectiles.forEach((projectile, index) => {
        if (
            projectile.x - projectile.radius < 0 ||
            projectile.x + projectile.radius > canvas.width ||
            projectile.y - projectile.radius < 0 ||
            projectile.y + projectile.radius > canvas.height
        ) {
            projectiles.splice(index, 1);
        }
        projectile.update();
    });

    enemies.forEach((enemy, enemyIndex) => {
        projectiles.forEach((projectile, projectileIndex) => {
            const distance = Math.hypot(
                projectile.x - enemy.x,
                projectile.y - enemy.y
            );
            if (distance - projectile.radius - enemy.radius <= 0) {
                for (let i = 0; i < 8; i++) {
                    particles.push(
                        new Particle(
                            projectile.x,
                            projectile.y,
                            Math.random() * (3 - 1) + 1,
                            enemy.color,
                            {
                                x: (Math.random() - 0.5) * 3,
                                y: (Math.random() - 0.5) * 3,
                            }
                        )
                    );
                }
                if (enemy.radius - 10 > 5) {
                    score += 100;
                    scoreEl.innerText = score;
                    gsap.to(enemy, {
                        radius: enemy.radius - 10,
                    });
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1);
                    }, 0);
                } else {
                    score += 250;
                    scoreEl.innerText = score;
                    setTimeout(() => {
                        enemies.splice(enemyIndex, 1);
                        projectiles.splice(projectileIndex, 1);
                    }, 0);
                }
            }
        });

        const distPlayerEnemy = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (distPlayerEnemy - enemy.radius - player.radius <= 0){
            cancelAnimationFrame(animationId);
            bigScoreEl.innerText = score;
            startGameBtn.innerText = "Restart Game";
            modalEl.style.display = "flex";
        }
        enemy.update();
    });
}

window.addEventListener("click", (event) => {
    const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x);
    const velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5,
    };
  
    const projectile = new Projectile(player.x, player.y, 5, "white", velocity);
    projectiles.push(projectile);
  });
  
  startGameBtn.addEventListener("click", () => {
    init();
    modalEl.style.display = "none";
    animate();
    spawnEnemies();
  });