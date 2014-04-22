var canvas = document.getElementById("snake-game");
var context = canvas.getContext("2d");
var score = 0,
        direction = "RIGHT",
        active = true,
        speed = 200,
        level = 1,
        snake = new Array(3);
var img = new Image();
img.src = 'image/snake.gif';
var headImage = new Image();
headImage.src = 'image/url2.png';
var downImage = new Image();
downImage.src = 'image/url3.png';
var upImage = new Image();
upImage.src = 'image/url4.png';
var leftImage = new Image();
leftImage.src = 'image/url1.png';
var img1 = new Image();
img1.src = 'image/url8.png';
var img2 = new Image();
img2.src = 'image/url9.png';
var img3 = new Image();
img3.src = 'image/url10.png';
var game = new Array(20);
for (var i = 0; i < game.length; i++) {
    game[i] = new Array(20);
}
canvas.width = 404;
canvas.height = 424;
game = generateSnake(game);
generateFood();
drawGame();
window.addEventListener('keydown', function(e) {
    if (e.keyCode === 38 && direction !== "DOWN") {
        direction = "UP"; // Up
    } else if (e.keyCode === 40 && direction !== "UP") {
        direction = "DOWN"; // Down
    } else if (e.keyCode === 37 && direction !== "RIGHT") {
        direction = "LEFT"; // Left
    } else if (e.keyCode === 39 && direction !== "LEFT") {
        direction = "RIGHT"; // Right
    }
});

function drawMain() {
    context.lineWidth = 2; // Our border will have a thickness of 2 pixels
    context.strokeStyle = 'black';
    context.fillStyle = 'black';// The border will also be black
    context.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);
    context.strokeRect(200, 220, 60, 60);
    context.fillRect(200, 220, 60, 60);
    context.drawImage(img, 200, 220, 60, 60);
    context.stroke();
    context.fillStyle = 'black';
    context.font = '14px sans-serif';
    context.fillText("SCORE:" + score + " - Level :" + level, 2, 10);
}

function generateFood() {
    var foodX = Math.round(Math.random() * 19),
            foodY = Math.round(Math.random() * 19);
    var flag = true;
    for (var i = 0; i < snake.length; i++) {
        if (snake[i].x === foodX && snake[i].y === foodY) {
            flag = false;
            break;
        }
    }
    if (!flag) {
        generateFood();
    }
    while (foodX >= 10 && foodX <= 12 || foodX >= 5 && foodX <= 7) {
        foodX = Math.round(Math.random() * 19);
    }
    game[foodX][foodY] = 1;
}

function generateSnake(game) {
// Generate a random position for the row and the column of the head.
    var snakeX = Math.round(Math.random() * 19),
            snakeY = Math.round(Math.random() * 19);
    while ((snakeX - snake.length) < 0) {
        snakeX = Math.round(Math.random() * 19);
    }
    while (snakeX > 9) {
        snakeX = Math.round(Math.random() * 19);
    }
    while (snakeX >= 10 && snakeX <= 12 || snakeX >= 5 && snakeX <= 7) {
        snakeX = Math.round(Math.random() * 19);
    }
    for (var i = 0; i < snake.length; i++) {
        snake[i] = {x: snakeX - i, y: snakeY};

    }
    game[snakeX][snakeY] = 3;
    game[snakeX - 1][snakeY] = 2;
    game[snakeX - 2][snakeY] = 2;
    return game;
}

function showGameOver() {
    // Disable the game.
    active = false;
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.font = '16px sans-serif';
    context.fillText('Game Over!', ((canvas.width / 2) - (context.measureText('Game Over!').width / 2)), 50);
    context.font = '12px sans-serif';
    context.fillText('Your Score Was: ' + score, ((canvas.width / 2) - (context.measureText('Your Score Was: ' + score).width / 2)), 70);
}

function obstacleCrash() {
    // Disable the game.
    active = false;
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.font = '16px sans-serif';
    context.fillText('You have been killed by the snakeBox', ((canvas.width / 2) - (context.measureText('You have been killed by the snakeBox.').width / 2)), 50);
    context.fillText('Avoid Hitting Them.!!!', ((canvas.width / 2) - (context.measureText('Avoid Hitting Them.!!!').width / 2)), 68);
    context.font = '12px sans-serif';
    context.fillText('Your Score Was: ' + score, ((canvas.width / 2) - (context.measureText('Your Score Was: ' + score).width / 2)), 86);
}


// Start cycling the matrix
function matrixCycling(snake) {
    for (var x = 0; x < game.length; x++) {
        for (var y = 0; y < game[0].length; y++) {
            if (game[x][y] === 1) {
                context.fillStyle = 'red';
                context.fillRect(x * 20, y * 20 + 20, 20, 20);
            } else if (game[x][y] === 2) {
                context.fillStyle = 'green';
                context.fillRect(x * 20, y * 20 + 20, 20, 20);
                if (direction === "RIGHT" || direction === "LEFT") {
                    context.drawImage(img1, x * 20, y * 20 + 20, 20, 20);
                }
                else if (direction === "UP") {
                    context.drawImage(img2, x * 20, y * 20 + 20, 20, 20);
                }
                else if (direction === "DOWN") {
                    context.drawImage(img2, x * 20, y * 20 + 20, 20, 20);
                }
            }
            else if (game[x][y] === 3) {
                context.fillStyle = 'green';
                context.fillRect(snake[0].x * 20, snake[0].y * 20 + 20, 20, 20);
                switch (direction) {
                    case "RIGHT" :
                        context.drawImage(headImage, snake[0].x * 20, snake[0].y * 20 + 20, 20, 20);
                        break;
                    case "LEFT" :
                        context.drawImage(leftImage, snake[0].x * 20, snake[0].y * 20 + 20, 20, 20);
                        break;
                    case "UP" :
                        context.drawImage(upImage, snake[0].x * 20, snake[0].y * 20 + 20, 20, 20);
                        break;
                    case "DOWN" :
                        context.drawImage(downImage, snake[0].x * 20, snake[0].y * 20 + 20, 20, 20);
                        break;
                    default :
                        break;
                }
            }
        }
    }
}

function higherLevels(snake) {
    if (level === 2 || level === 3) {
        context.strokeStyle = 'black';
        context.fillStyle = "black";
        context.strokeRect(96, 120, 64, 60);
        context.fillRect(96, 120, 64, 60);
        context.drawImage(img, 96, 120, 64, 60);
        context.stroke();
        if (snake[0].x === 5) {
            if (snake[0].y >= 5 && snake[0].y <= 7) {
                obstacleCrash();
                return;
            }
        }
        if (snake[0].x === 6) {
            if (snake[0].y >= 5 && snake[0].y <= 7) {
                obstacleCrash();
                return;
            }
        }
        if (snake[0].x === 7) {
            if (snake[0].y >= 5 && snake[0].y <= 7) {
                obstacleCrash();
                return;
            }
        }
    }
}

function gameResult(snake) {
    if (game[snake[0].x][snake[0].y] === 1) {
        score += 10;
        var x = snake[snake.length - 1].x,
                y = snake[snake.length - 1].y;
        snake.push({
            'x': x,
            'y': y
        });
        game[x][y] = 2;
        generateFood();
        if ((score % 100) === 0) {
            level += 1;
            if (level === 4) {
                alert("WINNER!!!");
                showGameOver();
            }
        }
    }
    else if (game[snake[0].x][snake[0].y] === 2) {
        showGameOver();
    }
}

function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = snake.length - 1; i >= 0; i--) {
        if (i === 0) {

            switch (direction) {
                case "RIGHT":
                    snake[0] = {x: snake[0].x + 1, y: snake[0].y};
                    break;
                case "LEFT":
                    snake[0] = {x: snake[0].x - 1, y: snake[0].y};
                    break;
                case "UP":
                    snake[0] = {x: snake[0].x, y: snake[0].y - 1};
                    break;
                case "DOWN":
                    snake[0] = {x: snake[0].x, y: snake[0].y + 1};
                    break;
            }

            if (snake[0].x < 0 || snake[0].x >= 20 || snake[0].y < 0 || snake[0].y >= 20) {
                showGameOver();
                return;
            }
            if (snake[0].x === 10) {
                if (snake[0].y >= 10 && snake[0].y <= 12) {
                    obstacleCrash();
                    return;

                }
            }
            if (snake[0].x === 11) {
                if (snake[0].y >= 10 && snake[0].y <= 12) {
                    obstacleCrash();
                    return;

                }
            }
            if (snake[0].x === 12) {
                if (snake[0].y >= 10 && snake[0].y <= 12) {
                    obstacleCrash();
                    return;
                }
            }

            higherLevels(snake);
            gameResult(snake);
            game[snake[0].x][snake[0].y] = 3;
        }
        else {
            if (i === (snake.length - 1)) {
                game[snake[i].x][snake[i].y] = null;
            }
            snake[i] = {x: snake[i - 1].x, y: snake[i - 1].y};
            game[snake[i].x][snake[i].y] = 2;
            if (game[snake[i].x][snake[i].y] === 1) {
                generateFood();
            }
        }
    }
    drawMain();
    matrixCycling(snake);
    if (active) {
        setTimeout(drawGame, speed - (level * 50));
    }
}