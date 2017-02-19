var can = document.getElementById("myCanvas");
var cxt = can.getContext("2d");
var score = document.getElementById("score");
var food;
var len = 10;

function Node(x, y) {
    this.x = x;
    this.y = y;
    this.prev = null;
    this.next = null;
    cxt.fillRect(this.x, this.y, len, len);

    this.moveTo = function(newX, newY) {
        this.x = newX;
        this.y = newY;
        cxt.strokeRect(this.x, this.y, len, len);
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

    this.moveSnake = function() {
        tail.moveTo(head.x + len, head.y);

    }
}

var snake = new Snake();
randomFood();

function trigger() {
    var button = document.getElementById("button");
    console.log(button.value);
    if (button.value == "Start") {
        button.value = "Stop";
        start();
    }
    else {
        button.value = "Start";
        stop();
    }
}

function start() {
    console.log("start");
    //gameloop = setInterval(snake.move, 100);
    snake.moveSnake();
}

function stop() {
    console.log("stop");
}