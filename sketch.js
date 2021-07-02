
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
monkey_running =    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
createCanvas(400,400);
  
  var survivalTime = 0
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}


function draw() {
  
  background(225);
  
  stroke("black");
  textSize(15);
  fill("black");
  text("Score: "+ score, 2,30);
  
  stroke("black");
  textSize(15);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100, 30);
  
  if(gameState === PLAY){
    
  monkey.collide(ground);
  spawnFood();
  spawnObstacles();
        
    if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  }
  
  if(monkey.isTouching(FoodGroup)){
    score = score + 5;
    FoodGroup.destroyEach();
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
  if(gameState === END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    text("GAME OVER",140,170);
    text("press 'r' to restart", 140,180);
    
    if(keyDown("r")){
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      score = 0;
      survivalTime = 0
      gameState = PLAY;
    }
  }

  
 
  
drawSprites();
  
  
}

function spawnFood(){
  if(frameCount % 80 === 0){
    banana = createSprite(400,400,20,20);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 100;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(280,330,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 100;
    obstacle.scale = 0.1;
    
    obstacleGroup.add(obstacle);
  }
}




