var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var score = document.querySelector('#score');
var btn = document.querySelector('#btn');
var stop = document.querySelector('#st');
stop.addEventListener('click',()=>{
    c.clearRect(0, 0, innerWidth, innerHeight);
    window.cancelAnimationFrame(req);
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouse = {
    x: undefined,
    y: undefined
};

var killer = {
    x: undefined,
    y: undefined
};
var circleArr = [];
var maxRadius = 50;
var minRadius = 2;

var bubbles = 200;
var req;

var count = 0; 
score.style.fontSize = "20px";
score.style.color = "lightgreen";
score.innerHTML =  "Score = "+count;

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;

});

window.addEventListener('resize', function (e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

canvas.addEventListener('click', function (e) {
    killer.x = e.x;
    killer.y = e.y;
    bubbleChecker();
});

function bubbleChecker() {

    let index = circleArr.findIndex(e => Math.ceil(e.x) >= killer.x && Math.ceil(e.y) >= killer.y);

    if(index !== -1){
        circleArr.splice(index,1);
        count++;
        score.innerHTML = "Score = "+count;
    }
   
    // console.log(circleArr.length)
     if(circleArr.length === 0 ){
        c.clearRect(0, 0, innerWidth, innerHeight);
        window.cancelAnimationFrame(req);
    }
}

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = minRadius;


    this.r;
    this.g;
    this.b;

    // this.color = "rgb(255,255,255,0.8)";
    this.color = "silver";

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
            this.colorize();
            this.color = `rgb(${this.r},${this.g},${this.b},0.5)`;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
            this.colorize();
            this.color = `rgb(${this.r},${this.g},${this.b},0.5)`;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity

        if (
            mouse.x - this.x < 50 &&
            mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50
        ) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    };

    this.colorize = function () {
        this.r = Math.round(Math.random() * 250);
        this.g = Math.round(Math.random() * 250);
        this.b = Math.round(Math.random() * 250);
    };

};

function init() {

    for (var i = 0; i < bubbles; i++) {

        var radius = Math.random() * 10 * 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 5;
        var dy = (Math.random() - 0.5) * 5;

        circleArr.push(new Circle(x, y, dx, dy, radius));
    }
};


function animate() {
    req = requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
    }
};


btn.addEventListener("click",(e)=>{
    init();
    animate();
});