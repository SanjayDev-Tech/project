const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

const tileSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: 300, y: 300 };
let dx = tileSize;
let dy = 0;
let score = 0;

function drawTile(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, tileSize, tileSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food.x = Math.floor(Math.random() * canvas.width / tileSize) * tileSize;
        food.y = Math.floor(Math.random() * canvas.height / tileSize) * tileSize;
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    if (checkCollision()) {
        alert(`Game over! Your score: ${score}`);
        document.location.reload();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    drawTile(food.x, food.y, 'red');

    // Move and draw snake
    moveSnake();
    snake.forEach((segment) => drawTile(segment.x, segment.y, 'lime'));

    setTimeout(gameLoop, 100);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (dy === 0) { dx = 0; dy = -tileSize; }
            break;
        case 'ArrowDown':
            if (dy === 0) { dx = 0; dy = tileSize; }
            break;
        case 'ArrowLeft':
            if (dx === 0) { dx = -tileSize; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx === 0) { dx = tileSize; dy = 0; }
            break;
    }
});

gameLoop();