var can = document.getElementById("myCanvas");
var cxt = can.getContext("2d");
var score = document.getElementById("score");
document.onkeydown = getDirection;
var food;
var len = 10;
var move_x = {'Left': -len, 'Right': len, 'Up': 0, "Down": 0};
var move_y = {'Left': 0, 'Right': 0, 'Up': -len, 'Down': len};
var node_matrix = new Array();
for (var i = 0; i < 80; i++) {
    node_matrix[i] = new Array();
    for (var j = 0; j < 50; j++) {
        node_matrix[i][j] = 0;
    }
}

function Node(x, y) {
    this.x = x;
    this.y = y;
    this.prev = null;
    this.next = null;
    cxt.fillRect(this.x, this.y, len, len);

    this.moveTo = function(newX, newY) {
        cxt.clearRect(this.x, this.y, len, len);
        this.x = newX;
        this.y = newY;
        cxt.fillRect(this.x, this.y, len, len);
    }
}

function randomFood() {
    var x = Math.floor(Math.random() * 80) * 10; // 0 - 790
    var y = Math.floor(Math.random() * 50) * 10; // 0 - 490
    food = new Node(x, y);
}

function Snake() {
    var head = new Node(20, 0);
    var mid = new Node(10, 0);
    var tail = new Node(0, 0);
    head.next = mid;
    mid.prev = head;
    mid.next = tail;
    tail.prev = mid;
    node_matrix[0][0] = 1;
    node_matrix[1][0] = 1;
    node_matrix[2][0] = 1;
    this.direct = 'Right';

    this.eatFood = function() {
        head.prev = food;
        food.next = head;
        head = food;
        randomFood();
    }

    this.moveSnake = function() {
        console.log(this.direct);
        var newX = head.x + move_x[this.direct];
        var newY = head.y + move_y[this.direct];

        console.log(newX, newY);
        console.log(node_matrix[newX / 10][newY / 10] );
        if (newX > 790 || newX < 0 || newY > 490 || newY < 0 || node_matrix[newX / 10][newY / 10] == 1)
            return gameOver();

        if (newX == food.x && newY == food.y) {
            this.eatFood();
            newX = head.x + move_x[this.direct];
            newY = head.y + move_y[this.direct];
        }

        node_matrix[tail.x / 10][tail.y / 10] = 0;
        tail.moveTo(newX, newY);
        node_matrix[tail.x / 10][tail.y / 10] = 1;
        tail.prev = null;
        tail.next = head;
        head.prev = tail;
        head = tail;
        tail = mid;
        tail.next = null;
        mid = tail.prev;
    }
}

function getDirection(event) {
    var event = event || window.event;
    console.log("key", event.keyCode);
    switch (event.keyCode) {
        case 37: //left
            if (snake.direct != 'Right')
                snake.direct = 'Left';
            break;
        case 38: //up
            if (snake.direct != 'Down')
                snake.direct = 'Up';
            break;
        case 39: //right
            if (snake.direct != 'Left')
                snake.direct = 'Right';
            break;
        case 40: //down
            if (snake.direct != 'Up')
                snake.direct = 'Down';
            break;
        default:
            break;
    }

}

function trigger() {
    var button = document.getElementById("button");
    console.log(button.value);
    if (button.value == "Start") {
        button.value = "Stop";
        gameloop = setInterval(snake.moveSnake.bind(snake), 500); // start loop
    }
    else {
        button.value = "Start";
        clearInterval(gameloop); // stop loop
    }
}

function gameOver() {
    clearInterval(gameloop);
    alert("game over!");
}

var snake = new Snake();
randomFood();