/****************************
// canvas boundary constants
****************************/
const X_MAX = 400;
const X_MIN = 0;
const Y_MAX = 380;
const Y_MIN = 0;
const GOAL_BOUNDARY = 50;

/*********************************
// enemy class - player must avoid
// takes y-coord is a parameter
*********************************/
var Enemy = function(y) {
    // x is negative for spawning/wrapping to appear more natural
    this.x = -100;
    this.y = y;
    this.speed = this.getSpeed();

    // defines hitbox for collision
    this.width = 45;
    this.height = 30;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);

    // if enemy is outside canvas, respawns with random speed
    if (this.x > 505) {
        this.speed = this.getSpeed();
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// gets a random speed for the enemy
Enemy.prototype.getSpeed = function() {
    return Math.floor(Math.random() * (300 - 50 + 1)) + 50;
};

/************************************************
// player class
// This class requires an update(), render() and
// a handleInput() method.
************************************************/
var Player = function() {
    // sets player start location
    this.respawn();

    // how fast the player can move
    this.stepX = 50;
    this.stepY = 80;

    // defines hitbox for collision
    this.width = 10;
    this.height = 10;

    // sets image for player character
    this.sprite = this.getCostume();
};

// updates the player's position
Player.prototype.update = function() {
    // resets player if the collide with an object
    this.checkCollision(allEnemies);

    // resets player if the reach the goal and changes costume
    if (this.y < GOAL_BOUNDARY) {
        this.respawn();
        this.getCostume();
        console.log('goal reached');
    }
};

// draws player on the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// detects input to move player character
// see event listener on handling input for arg e
Player.prototype.handleInput = function(e) {
    // keeps player on canvas
    if (e === 'left' && this.x > X_MIN) {
        this.x -= this.stepX;
    }
    if (e === 'right' && this.x < X_MAX) {
        this.x += this.stepX;
    }
    if (e === 'up' && this.y > Y_MIN) {
        this.y -= this.stepY;
    }
    if (e === 'down' && this.y < Y_MAX) {
        this.y += this.stepY;
    }
    console.log('X: ' + this.x + ' Y: ' + this.y);
};

// respawns player at start point
Player.prototype.respawn = function() {
    this.x = 200;
    this.y = 380;
};

// checks to see if the player collided with an object
Player.prototype.checkCollision = function(collider) {
    // handles collision with objects in an array, loops appropriately
    if (Array.isArray(collider)){
        for (var i = 0; i < collider.length; i++) {
            if(collider[i].x + collider[i].width >= this.x &&
               collider[i].x <= this.x + this.width &&
               collider[i].y + collider[i].height >= this.y &&
               collider[i].y <= this.y + this.height) {
                this.respawn();
                console.log('collision detected');
            }
        }
    }
    // handles collision with a single object
    else {
        if (collider.x + collider.width >= this.x &&
            collider.x <= this.x + this.width &&
            collider.y + collider.height >= this.y &&
            collider.y <= this.y + this.height) {
            this.respawn();
            console.log('collision detected');
        }
    }
};

// gets a random costume, for variety yaayyy
Player.prototype.getCostume = function() {
    var costume = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    if (costume === 1) {
        this.sprite = 'images/char-boy.png';
    }
    else if (costume === 2) {
        this.sprite = 'images/char-cat-girl.png';
    }
    else if (costume === 3) {
        this.sprite = 'images/char-horn-girl.png';
    }
    else if (costume === 4) {
        this.sprite = 'images/char-pink-girl.png';
    }
    else if (costume === 5) {
        this.sprite = 'images/char-princess-girl.png';
    }
    return this.sprite;
};

/*
// rock class
// TODO: implement - used to block the player
// will likely put in goal to make game more challenging
*/

/*******************************************************/
// instantiate objects
// Place all enemy objects in an array called allEnemies.
// Place the player object in a variable called player.
// Enemies should have fixed y for proper placement on canvas,
// relative to sprites being used.
var allEnemies = [];
var player = new Player();
var enemy1 = new Enemy(225);
var enemy2 = new Enemy(310);
var enemy3 = new Enemy(140);
var enemy4 = new Enemy(60);
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});