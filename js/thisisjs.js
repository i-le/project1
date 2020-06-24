// getting canvas elements
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
// setting canvas size
const width = canvas.width = screen.width
const height = canvas.height = screen.height - 400
// game diffculty
let level = 0 
// keyborad moving right
let rightPressed = 0
// keyborad moving left
let leftPressed = 0
// empty arrary to store balls
let balls = []
// ball init speed
let v = 3
// animation 
let gameDiffSelctor = 0
// audio
document.querySelector(".btn1").addEventListener("click", function() {
    var bgmusic = new Audio('audio/audio.m4a');
    audio.play()
})
//================================PADDLE====================================
// creating paddle
const paddleHeight = 20;
const paddleWidth = 150;
// setting paddle x-axis
let paddleX = (canvas.width - paddleWidth) / 2;

// paddle function
function drawPaddle() {

    ctx.fillStyle = "pink";
    // paddle x axis, y axis, width, height
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
}

// add event linster when pressing keyboard
// creating an if for when release pressing paddle will stop moving
function keyPushDown(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true
    }
}
function keyPushUp(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false
    }
}
document.addEventListener("keydown", keyPushDown, false);
document.addEventListener("keyup", keyPushUp, false);

//================================BALL======================================
// creating function for ball objective
// creating random size and color when ball spwned 
// Ball = consturctor
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size
}
//console.log(Ball)
// funtion to draw ball object
Ball.prototype.draw = function () {
    ctx.beginPath();
    // random colors for ball
    ctx.fillStyle = this.color;
    // define the startAngle and endAngle to be 0 and 2pi. Like so: arc(x, y, r, 0, Math.PI*2)
    // r = this.size = random ball radius c = 2rpi
    // draw a ball at this.x x-axis, this.y y-axis with a radius of this.size
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    //  fill in the circle // stroke() is for a empty circle
    ctx.fill()
}

// ball movement function
// setting up a gameover condition
let gameover = 0 
Ball.prototype.update = function () {
// if it hits something, - let ball resvers its moving dirction
    // right and left side canvas
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX)
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX)
    }
    // up side canvas
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY)
    }
    // down side canvas
    if (this.y + this.velY > canvas.height - this.size - paddleHeight) {
        if (this.x + this.velX > paddleX && this.x + this.velX < paddleX + paddleWidth) {
            this.velY = -(this.velY)
        }
    }

// setting up is ball exceeding canvas then game is over 
    if (this.y + this.size > canvas.height) {
        // avoiding keep jugding if gameover or not
        gameover += 1
        if (gameover === 1) {
            alert("<b>GAME OVER</b>");
// after clicked alert back to main screen
            location.reload()
    }
}

    this.x += this.velX;
    this.y += this.velY
}
//==============================GAME FUNCTIONS=================================
// function to randomize
function random(min, max) {
    let num = Math.ceil(Math.random() * (max - min)) + min;
    return num
}
// set game diffculties (SetD)
// type = number = balls appear in canvas
function SetD(type) {
    if (level === 0) {
        for (let i = 0; i < type; i++) {
            let ball = new Ball(
                // setting random ball appears at canvas x-axis, min 40, max canvas width
                random(89, width),
                // setting random ball appears at canvas y axis, min 40, max 100
                // giving more space till ball falls to buttom
                // fixed bug > ball size is too big
                // changing y axis 100 - 200
                random(89, 200),
                // x axis speed
                v + i, 
                // y axis speed
                v + i,
                // when ball pushed, giving a random color
                'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
                // ball raduis from 15-99
                random(15, 88)
            );
            balls.push(ball)
        }
        //console.log(SetD)
    } 
// cancel animation and return back to main screen
    level = type
    window.cancelAnimationFrame(gameDiffSelctor)
    gameDiff()
}
// selecting game diffculties before jumping into actuall game
function gameDiff() {
    let gameD = 0
    // set number of balls depends number of levels
    // set paddle y axis
    switch (level) {
        case 1: 
            gameD = {
                paddleSpeed: 15
            }
            break;
        case 2:
            gameD = {
                paddleSpeed: 15
            }
            break;
        case 3:
            gameD = {
                paddleSpeed: 15
            }
            break;
        }
    // backgroud
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
    drawPaddle();
    // keep paddle moving right
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += gameD.paddleSpeed;
        // keep moving left
    } else if (leftPressed && paddleX > 0) {
        paddleX -= gameD.paddleSpeed;
    }
    // drawing balls and keep updating balls postion 
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update()
    }
// starting all animation
    gameDiffSelctor = requestAnimationFrame(gameDiff);
}
