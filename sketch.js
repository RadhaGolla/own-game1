var PLAY=1;
var END=0;
var gameState=PLAY;
var boy , boy_running;
var bg,bgImg;
var hurdle,hurdleImg;
var edges;
var hurdleGroup;
var gameover,gameOverImg;
var score;
var jumpSound,endSound;


function preload(){
  boy_running=loadImage("boy_run.png");
  hurdleImg=loadAnimation("hurdle.png");
  bgImg=loadImage("fence.jpg");
  gameOverImg=loadAnimation("gameover.png");
  jumpSound=loadSound("jump.mp3");
  endSound=loadSound("gameOver.wav");
}

function setup() {
  createCanvas(300,300);
  background("green");
  
  
  //moving background
  bg=createSprite(300,150,300,150);
  bg.addImage(bgImg);
  bg.velocityX=-3;
  bg.x=bg.width/2;
  
  //creating boy running
  boy=createSprite(40,250,20,50);
  boy.addImage(boy_running);
  boy.scale=0.4;
  
  //creating the edges
  edges =createEdgeSprites();
  
  //making hurdles into a group
  hurdleGroup = new Group();
  
  //gameover
  gameOver= createSprite(150,150);
  gameOver.addAnimation("gameOver",gameOverImg);
  gameOver.scale= 0.5 ;
  
  //score
  score = 0;
  
}

function draw() {
 background("green");
   
  
  if(gameState === PLAY){
  
  //to make the boy jump
  if(keyDown("space")&& boy.y>=100)
    {
      boy.velocityY= -12;
      jumpSound.play();
    }
  //adding gavity to the boy
  boy.velocityY=boy.velocityY+0.5;
  
  //repeat background
  if(bg.x<0)
    {
      bg.x=bg.width/2;
    }
  
  
  //spawn hurdles
  spawnHurdles();
  
  // making gameover invisible in PLAY state
   gameOver.visible=false; 
    
  //increase score with the getFramerate
  score=score+Math.round(getFrameRate()/60);
  
  //game end 
  
  if(hurdleGroup.isTouching(boy)){
    endSound.play();
    gameState=END;
  }
  }
  else if(gameState === END){
    bg.velocityX=0;
    hurdleGroup.setVelocityXEach(0);
    hurdleGroup.destroyEach();
    boy.destroy();
    hurdle.changeAnimation(gameOverImg);
    gameOver.visible=true;
  }
  
  
  //make the boy collide with the bottom edge of canvas
  boy.collide(edges[3]);
  drawSprites();
 
  // to display the score
  fill("black");
  textSize(18);
  textFont("Georgia");
  text("Score:"+score,210,30);
}


function spawnHurdles(){
  if(frameCount%150===0)
    {
      hurdle=createSprite(300,260,40,10);
      hurdle.velocityX=-2;
      hurdle.scale=0.7;
      hurdle.addAnimation("hurdle",hurdleImg);
      hurdle.lifetime=150;
      
      //adding hurdles to group
      hurdleGroup.add(hurdle);
    }
    
}