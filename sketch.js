var dog,dog1,dog2;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var gameState= "playing"
function preload(){
   dog1=loadImage("images/dogImg.png");
   dog2=loadImage("images/Happy.png");
   sadDog= loadImage("images/Lazy.png")
   //dog6=loadImage("images/Happy.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);
  foodObj=new Food();
  dog=createSprite(250,300,150,150);
  dog.addImage(dog1);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
   
  feed=createButton("Feed the dog");
  feed.position(650,90);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(750,90);
  addFood.mousePressed(addFoods);

}

// function to display UI
function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 200,90);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 200,90);
   }
   currentTime= hour();
   if(currentTime==(lastFed + 1)){
     update("playing");
    foodObj.garden()
   } else if(currentTime==(lastFed + 2)){
    update("sleeping")
   } else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)){
     update("bathing");
     foodObj.washroom();
   } else {
     update("hungry");
     foodObj.display();
   }
   if(gameState !="hungry"){
     feed.hide();
     addFood.hide();
     dog.remove();
   } else{
     feed.show();
     addFood.show();
     dog.addImage(sadDog);
   }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(dog2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function update(){
  database.ref('/').update({
    gameState:state
  });
}