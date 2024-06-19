let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('eat_meeee.mp3');
const gameOverSound = new Audio('snake.mp3');
const moveSound = new Audio('cat.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 10, y: 5}
];

food = {x: 19, y: 21};

function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameMind();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 25 || snake[0].x <=0 || snake[0].y >= 25 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameMind(){
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir =  {x: 0, y: 0}; 
        alert("Your score is " +score +" & Last highscore is " +hiscore);
        snakeArr = [{x: 13, y: 15}];
        score = 0; 
    }


    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            HiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

 
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    HiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    moveSound.play()
    if (e.key == "ArrowUp" && inputDir.y != 1){
        inputDir.x = 0;
        inputDir.y = -1;
    }
    else if (e.key == "ArrowDown" && inputDir.y != -1){
        inputDir.x = 0;
        inputDir.y = 1;
    }
    else if (e.key == "ArrowLeft" && inputDir.x != 1){
        inputDir.x = -1;
        inputDir.y = 0;
    }
    else if (e.key == "ArrowRight" && inputDir.x != -1){
        inputDir.x = 1;
        inputDir.y = 0;
    }
    
}
);