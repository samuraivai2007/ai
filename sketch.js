//gameStates
var PLAY=1;
var END=0;
var gameState=1;

//creating variable
var enemyGroup,monsterImage;

var fruit1,fruit2,fruit3,fruit4,fruitGroup;

var gameOver,gameOverImage,score;

var knife,knifeImage;

var gameOverSound,knifeSwooshSound;
var score=0;
function preload(){
 fruit1=loadImage("fruit1.png") ;
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  
  monsterImage=loadAnimation("alien1.png","alien2.png");
  
  gameOverImage=loadImage("gameover.png");
  
  knifeImage=loadImage("knife.png");
 
  knifeSwooshSound=loadSound("knifeSwoosh.mp3");
  gameOverSound=loadSound("gameover.mp3");
}
function setup(){
 createCanvas(600,600);
 
  
  knife=createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.7;
  
  //collider for knife
  knife.setCollider("rectangle",0,0,40,80);
  
  gameOver=createSprite(280,250,50,50);
  gameOver.visible=false;
  fruitGroup=new Group();
  enemyGroup=new Group();
  
  score=0;
}

function draw(){
   background("lightblue");  

  if(gameState===PLAY){
    //fruits and monster function
  fruits() ;
  Monster();
   //move the knife
  knife.y=World.mouseY;
  knife.x=World.mouseX;
    
    //increase the score
  if(fruitGroup.isTouching(knife)){
    knifeSwooshSound.play();
    fruitGroup.destroyEach();
    score=score+2;} 
  if(enemyGroup.isTouching(knife))
    {
    gameOverSound.play();
    gameState=END;}}
  
  if(gameState===END){
    
      fruitGroup.destroyEach();
      enemyGroup.destroyEach() ;
      fruitGroup.setVelocityEach(0);
      enemyGroup.setVelocityEach(0);
      
      //change animation
      gameOver.addImage(gameOverImage);
      gameOver.visible=true;
      knife.visible=false
  
  }
  drawSprites();
  //text
  text("Score="+score,200,45);
  
}
function fruits(){
  if(frameCount%60===0){
   if(Math.round(random(1,2))==1) {
  fruit=createSprite(400,200,20,20);
     fruit.y=Math.round(random(100,300))
  var f=Math.round(random(1,4));
    if (f==1)
      fruit.addImage(fruit1);
    else if(f==2)
      fruit.addImage(fruit2);
    else if(f==3)
      fruit.addImage(fruit3);
    else if(f==4)
      fruit.addImage(fruit4);
  fruit.scale=0.2;
  fruit.velocityX=-10;
   fruitGroup.add(fruit);}
    else{
    fruitX=createSprite(0,20,20,20);
      fruitX.y=Math.round(random(100,300))
    r=Math.round(random(1,4));
    if(r==1)
      fruitX.addImage(fruit1);
    else if(r==2)
      fruitX.addImage(fruit2);
    else if(r==3)
      fruitX.addImage(fruit3);
    else if(r==4)
      fruitX.addImage(fruit4);
    fruitX.scale=0.2;
    fruitX.velocityX=10;
   fruitGroup.add(fruitX); }
 
   
  }
}


function Monster(){
  if(frameCount%150===0){
    monster=createSprite(400,200,20,20);
    monster.y=Math.round(random(100,300))
  monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(200,400));
    monster.velocityX=-7;
    monster.setLifetime=60;
    enemyGroup.add(monster);
  }
}
