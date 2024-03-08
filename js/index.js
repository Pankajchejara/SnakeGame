// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');

// Initial value of the variable
let wallPointx=35;
let wallPointy=18;
var a = 2;
var b = 17;
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};


document.querySelector('#IncreaseSpeed').addEventListener('click',()=>{
    speed=speed+1;
    document.querySelector('#speedData').textContent=speed;
   
})
document.querySelector('#DecreaseSpeed').addEventListener('click',()=>{

    if(speed>1){

        speed=speed-1;
    }
    document.querySelector('#speedData').textContent=speed;
   
})






// Function to update the variable based on the media query
function updateVariable() {
    // Check if the viewport width is between 720px and 1024px
    
    if (window.matchMedia('(min-width: 720px) and (max-width: 1024px)').matches) {
        wallPointx = 28; // Update the variable value when the media query matches
        wallPointy = 18; // Update the variable value when the media query matches
        a=2;
        b=17;
    } 
    if (window.matchMedia('(min-width: 600px) and (max-width: 720px)').matches) {
        wallPointx = 20; // Update the variable value when the media query matches
        wallPointy = 15; // Update the variable value when the media query matches
        a=2;
        b=14;
    } 
    if (window.matchMedia('(min-width: 400px) and (max-width: 600px)').matches) {
        wallPointx = 17; // Update the variable value when the media query matches
        wallPointy = 17; // Update the variable value when the media query matches
        a=2;
        b=16;
    } 
    if (window.matchMedia('(min-width: 320px) and (max-width: 400px)').matches) {
        wallPointx = 13; // Update the variable value when the media query matches
        wallPointy = 17; // Update the variable value when the media query matches
        a=2;
        b=13;
    } 

    //
    
}

// Call the function initially to set the variable value
updateVariable();

// Add a listener to update the variable when the viewport conditions change
window.addEventListener('resize', updateVariable);









// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= wallPointx || snake[0].x <=0 || snake[0].y >= wallPointy || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 10, y: 9}];
        // musicSound.play();
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
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
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});


