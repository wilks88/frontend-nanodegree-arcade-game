/****************************
// canvas boundary constants
****************************/
const X_MAX = 400;
const X_MIN = 0;
const Y_MAX = 380;
const Y_MIN = 0;
const WATER_BOUNDARY = 50;

/**************
// enemy class
**************/
// arg is y location for proper positioning
var Enemy = function(y) {
    // x is negative for spawning and wrapping to appear more natural
    this.x = -100;
    this.y = y;
    this.speed = this.getSpeed();

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
    };
    return this.x;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handles enemy collision with player
Enemy.prototype.collision = function() {
    // TODO: implement collision detection
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
    // sets initial image for player character
    this.sprite = 'images/char-horn-girl.png';
};

// updates the player's position
Player.prototype.update = function() {
    // reset player and change costume if they touch the water
    if (this.y < WATER_BOUNDARY) {
        this.respawn();
        this.getCostume();
        return this.x, this.y;
    };
};

// draws player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// detects input to move player character
Player.prototype.handleInput = function(e) {
    // keeps player on canvas
    if (e === 'left' && this.x > X_MIN) {
        this.x -= this.stepX;
    };
    if (e === 'right' && this.x < X_MAX) {
        this.x += this.stepX;
    };
    if (e === 'up' && this.y > Y_MIN) {
        this.y -= this.stepY;
    };
    if (e === 'down' && this.y < Y_MAX) {
        this.y += this.stepY;
    };
};

// respawns player to start point
Player.prototype.respawn = function() {
    this.x = 200;
    this.y = 380;
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

/*******************************************************/
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
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
