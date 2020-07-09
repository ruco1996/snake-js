window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    addEventListener('keypress', onKeyPress);
    createApple();
    setInterval(update, 1000 / 8);
};

function update() {
    appleListener();
    collisionListener();
    drawCanvas();
    drawApple();
    createSnake();
    drawSnake();
}
padding = 4;
scale = 25;
width = heigth = 500;

snake = { x: 0, y: 0 };
dirX = 1;
dirY = 0;

tail = [];
count = 0;

apple = { x: 0, y: 0 };

function drawCanvas() {
    ctx.clearRect(0, 0, width, heigth);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, heigth);
}

function createSnake() {
    for (let i = 0; i < tail.length - 1; i++) {
        tail[i] = tail[i + 1];
    }

    tail[count - 1] = { x: snake.x, y: snake.y };

    snake.x += dirX * scale;
    snake.y += dirY * scale;

    if (dirX == 1 && snake.x >= width) snake.x = 0;
    else if (dirX == -1 && snake.x < 0) snake.x = width - scale;

    if (dirY == 1 && snake.y >= heigth) snake.y = 0;
    else if (dirY == -1 && snake.y < 0) snake.y = heigth - scale;
}

function drawSnake() {
    ctx.fillStyle = '#BFD65A';
    for (let i = 0; i < tail.length; i++) {
        ctx.fillRect(tail[i].x + padding / 2, tail[i].y + padding / 2, scale - padding, scale - padding);
    }
    ctx.fillRect(snake.x + padding / 2, snake.y + padding / 2, scale - padding, scale - padding);
}

function createApple() {
    let exists;
    let x, y;
    do {
        x = Math.floor(Math.random() * 20) * scale;
        y = Math.floor(Math.random() * 20) * scale;

        exists = tail.find(t => t.x == x && t.y == y) || (snake.x == x && snake.y == y);
    } while (exists);

    apple.x = x;
    apple.y = y;
}

function drawApple() {
    ctx.fillStyle = '#D73B3B';
    ctx.fillRect(apple.x + padding / 2, apple.y + padding / 2, scale - padding, scale - padding);
}

function appleListener() {
    if (apple.x == snake.x && apple.y == snake.y) {
        createApple();
        count++;
    }
}

function collisionListener() {
    if (tail.find(t => t.x == snake.x && t.y == snake.y)) {
        snake = { x: 0, y: 0 };
        dirX = 1;
        dirY = 0;
        tail = [];
        count = 0;
    }
}

function onKeyPress(e) {
    switch (e.key) {
        case 'w':
            if (dirY == 0) {
                dirX = 0;
                dirY = -1;
            }
            break;
        case 'a':
            if (dirX == 0) {
                dirX = -1;
                dirY = 0;
            }
            break;
        case 's':
            if (dirY == 0) {
                dirX = 0;
                dirY = 1;
            }
            break;
        case 'd':
            if (dirX == 0) {
                dirX = 1;
                dirY = 0;
            }

            break;
    }
}
