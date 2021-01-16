
var monkey , monkey_running
var banana ,bananaImage,bananas, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
 
 
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1
 
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  //ground.setCollider("circle", 0, 10);
  console.log(ground.x)
 monkey.debug = true
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 
 
  invisibleGround = createSprite(200,350,400,10);
  invisibleGround.visible = false;
 
  obstaclesGroup = createGroup();
  FoodGroup = new Group();
 
}


function draw() {
background("white")
 
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
 
  monkey.velocityY = monkey.velocityY + 0.8
 
  monkey.collide(invisibleGround);
 
  bananas();
 
  Obstacles()  
 
  if(obstaclesGroup.isTouching(monkey)){
     ground.velocityX = 0;
        monkey.velocityY = 0;
   
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
  }
 stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);
  drawSprites();
}

function bananas(){
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana. y = Math.round(random(80,120));
    banana. addImage(bananaImage);
     monkey.depth = banana.depth + 1;
    banana. scale = 0.1;
    banana. velocityX = -3;
    FoodGroup.add(banana);
}
}

function Obstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(600,315,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.2;
   obstacle.velocityX = -4
   obstacle.debug = true
    obstaclesGroup.add(obstacle);
   monkey.depth = obstacle.depth + 1
 }
}

