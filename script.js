const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hue = 1;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined, 
    y: undefined
};

canvas.addEventListener('click', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

    for (i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    };
});

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

    for (i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
});

class Particle{
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 16 * 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1
    };

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };
};

const handleParticle = () => {
    for (i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        for (j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[j].x - particlesArray[i].x;
            const dy = particlesArray[j].y - particlesArray[i].y;

            const distance = Math.sqrt((dx * dx) + (dy * dy));

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            };
        };

        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    };
};


const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue += 5;
    requestAnimationFrame(animate);
};

animate();
