const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined, 
    y: undefined
};

// canvas.addEventListener('click', (event) => {
//     mouse.x = event.x;
//     mouse.y = event.y;
// });

// canvas.addEventListener('mousemove', (event) => {
//     mouse.x = event.x;
//     mouse.y = event.y;
// });

class Particle{
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 * 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    };

    draw() {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };
};

const init = () => {
    for (i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    };
};

init();

const handleParticle = () => {
    for (i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    };
};


const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    requestAnimationFrame(animate);
};

animate();
