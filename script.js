var canvas = document.getElementById("level");
var ctx = canvas.getContext("2d");
// var x = canvas.width / 2;
// var y = canvas.height - 30;
var dx = 0;
var dy = 0;
var odx = -5;
var ody = 0;
var gravity = 1;
var isPaused = false;

// TODO: Stuff
var player = { x: 100, y: canvas.height - 10, width: 10, height: 10 }
var nextObstacle = { x: canvas.width + 10, y: canvas.height - 10, width: 10, height: 10 }

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function beep() {
    var context = new AudioContext();
    var oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 140;
    oscillator.connect(context.destination);
    oscillator.start();
    setTimeout(function() {
        oscillator.stop();
    }, 50);
}

function keyDown(e) {
    switch (e.keyCode) {
        case 40:
            dy = 4;
            break;
        case 38:
            dy = -4;
            break;

    }
}

function keyUp(e) {
    switch (e.keyCode) {
        case 40:
            dy = 0;
            break;
        case 38:
            dy = gravity;
            break;

    }
}


function checkBoundaries(object) {
    if (
        object.y > canvas.height || object.y < 0
    ) {
        dy = 0;
    } else {
        dy = gravity;
    }

    return false;
}

function checkCollisions(object, obstacle) {
    //debugger
    let lx = object.x - object.width / 2;
    let rx = object.x + object.width / 2;
    let olx = obstacle.x - obstacle.width / 2;
    let orx = obstacle.x + obstacle.width / 2;

    let ly = object.y - object.height / 2;
    let ry = object.y + object.height / 2;
    let oly = obstacle.y - obstacle.height / 2;
    let ory = obstacle.y + obstacle.height / 2;

    if (
        lx >= olx &&
        rx <= orx &&
        ly >= oly &&
        ry >= ory
    ) {
        console.log('collision')
        beep()
    } else {

    }

    return false;
}


function drawObstacle() {
    ctx.beginPath();
    ctx.rect(nextObstacle.x, nextObstacle.y, 10, 10);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function animateObstacle() {
    ctx.clearRect(nextObstacle.x, nextObstacle.y, 10, 10);
    if (nextObstacle.x < 20) {
        nextObstacle.x = canvas.width + 10;
        return;
    }
    nextObstacle.x += odx;
    nextObstacle.y += ody;
    drawObstacle();

}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#777ddd";
    ctx.fill();
    ctx.closePath();
}

function animatePlayer() {
    ctx.clearRect(player.x - 20, player.y - 20, player.x + 20, player.y + 20);
    drawPlayer();
    player.x += dx;
    player.y += dy;
}

function animate() {
    animatePlayer();
    animateObstacle();
}

function phsyics() {
    checkCollisions(player, nextObstacle)
    checkBoundaries(player)
}

function tick() {
    if (!isPaused) {
        animate();
        phsyics();
    }
}

var int = setInterval(tick, 10);

function pause() {
    isPaused = isPaused ? false : true;
}