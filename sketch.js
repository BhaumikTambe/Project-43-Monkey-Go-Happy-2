
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var backgroundImage,gameOver, GameOverImg;
var score;
var survivalTime=0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  backgroundImg = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  GameOverImg = loadImage("gameOver.png");

 
}



function setup() {
  createCanvas (800,450)
  
  background = createSprite(10,0,700,450);
  background.addImage("B",backgroundImg);
  background.scale = 1.5;
  
  monkey = createSprite (100,400, 20, 20)
  monkey.addAnimation("monkeyrunning", monkey_running);
  monkey.scale = 0.1;

  gameOver = createSprite(400,220,40,10);
  gameOver.addImage("B",GameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;

  
  
  //obstacle = createSprite(300,500,20,20)
 
  
  ground = createSprite(100,420,700,20);
  ground.x = ground.width /2;
  ground.visible = false;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  
  score = 0;
  
  
}


function draw() {

   background.velocityX = -3; 


    if (background.x < 0){
      background.x = background.width/2;
    }
  
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnObstacles();
    spawnBanana();
  
   if(keyDown("space") && monkey.y >= 250) {
        monkey.velocityY = -11;
    }

      if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score+2;
      monkey.scale += 0.019;
    }
  
  monkey.velocityY = monkey.velocityY + 0.7

   monkey.collide(ground); 

   drawSprites();

   if(obstacleGroup.isTouching(monkey)) {
    gameState = END;
   }else if(gameState === END) {
    background.velocityX = 0;
    monkey.visible = false;

    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    
    gameOver.visible = true
   }
  
  fill("white");
  textSize(27);
 text("SCORE: "+ score, 500,50);
  
}



function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(450,370,10,10);
   obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
   obstacle.addImage("O",obstacleImg);
   obstacle.velocityX = -(6 + score/8);
   
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage("O",obstacleImg);
      break;
      default: break;
    }
   
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
  
  
  
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    banana = createSprite(600,100,20,10);
    banana.y = Math.round(random(100,200));
    banana.addImage("Banana",bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 500;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   bananaGroup.add(banana);
    }
}


