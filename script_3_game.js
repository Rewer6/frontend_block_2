 //Виведення результатів на сторінку:
 const resultsButton = document.getElementById('button_game_result');
 const resultsDiv = document.getElementById('results_game');

 // Додаємо обробник подій до кнопки
 resultsButton.addEventListener('click', function() {
     // Отримуємо результати гри
     const topGames = getTopGames();
     const bottomGames = getBottomGames();

     // Створюємо рядок для відображення результатів
     let resultsString = '<h4>Топ 3 ігри</h4><ul>';
     topGames.forEach(function(score) {
         resultsString += '<li>' + score + '</li>';
     });
     resultsString += '</ul><h4>Три найгірших гри</h4><ul>';
     bottomGames.forEach(function(score) {
         resultsString += '<li>' + score + '</li>';
     });
     resultsString += '</ul>';

     // Відображаємо результати в div для результатів
     resultsDiv.innerHTML = resultsString;
 });

 //Скрипт гри у змійку
 const canvas = document.getElementById('gameCanvas');
 const ctx = canvas.getContext('2d');
 const startButton = document.getElementById('startButton');

 const box = 20;
 let snake = [];
 snake[0] = {x: 10 * box, y: 10 * box};
 let food = {
     x: Math.floor(Math.random()*17+1) * box,
     y: Math.floor(Math.random()*17+1) * box
 }

 let Score = 0;
 let Game;
 let d;

 startButton.addEventListener("click", function() {
 Game = setInterval(draw, 150);
 });

 document.addEventListener("keydown", direction);

 function direction(event){
     if(event.keyCode == 65 && d != "RIGHT"){
         d = "LEFT";
     }else if(event.keyCode == 87 && d != "DOWN"){
         d = "UP";
     }else if(event.keyCode == 68 && d != "LEFT"){
         d = "RIGHT";
     }else if(event.keyCode == 83 && d != "UP"){
         d = "DOWN";
     }
 }

 function draw(){
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     for(let i = 0; i < snake.length; i++){
         ctx.fillStyle = (i == 0)? "green" : "white";
         ctx.fillRect(snake[i].x, snake[i].y, box, box);
     }
     
     ctx.fillStyle = "red";
     ctx.fillRect(food.x, food.y, box, box);
     
     let snakeX = snake[0].x;
     let snakeY = snake[0].y;
     
     if(d == "LEFT") snakeX -= box;
     if(d == "UP") snakeY -= box;
     if(d == "RIGHT") snakeX += box;
     if(d == "DOWN") snakeY += box;
     
     if(snakeX == food.x && snakeY == food.y){
         Score++
         food = {
             x: Math.floor(Math.random()*17+1) * box,
             y: Math.floor(Math.random()*17+1) * box
         }
     }else{
         snake.pop();
     }
     
     let newHead = {
         x: snakeX,
         y: snakeY
     }
     
     if(snakeX < 0 || snakeY < 0 || snakeX > 19 * box || snakeY > 19 * box || collision(newHead, snake) ){
         clearInterval(Game);
         saveGame(Score);
         printGames();
     }
     
     snake.unshift(newHead);

     ctx.fillStyle = "white";
     ctx.font = "45px Changa one";
     ctx.fillText(Score, 2*box, 1.6*box);
 }
 function collision(head, array){
 for(var i = 0; i < array.length; i++){
     if(head.x == array[i].x && head.y == array[i].y){
         return true;
       }
   }
   return false;
 }

 // Зберігаємо результати гри
 function saveGame(score) {
     let games = JSON.parse(localStorage.getItem('games')) || [];
     games.push(score);
     games.sort((a, b) => b - a);
     localStorage.setItem('games', JSON.stringify(games));
 }
 function getTopGames() {
     let games = JSON.parse(localStorage.getItem('games')) || [];
     return games.slice(0, 3);
 }
 function getBottomGames() {
     let games = JSON.parse(localStorage.getItem('games')) || [];
     return games.slice(-3);
 }

 function printGames() {
     console.log("Топ 3 найкращі гри: ", getTopGames());
     console.log("Топ 3 найгірших гри: ", getBottomGames());
 }