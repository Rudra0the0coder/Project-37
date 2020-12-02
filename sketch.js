var dogImg, happyDogImg, dog, database, foodS,sadDog, foodStock, canvas, lastFed, fedTime, foodObj, feed, addFood, food1, foodCount, input, milk, milkImg;

function preload() {
  dogImg = loadImage('Dog.png');
  happyDogImg = loadImage('dogImg1.png');
  milkImg = loadImage('Milk.png');
  sadDog  =loadImage('lazy.png');
}

function setup() {
  database = firebase.database();
  readState=database.ref('gameState');
  readState.on("value",function(data){
gameState =data.val();
  });

  dog = createSprite(650, 250);
  dog.scale = 0.3;
  dog.addImage(dogImg);

  milk = createSprite(565, 300);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  milk.visible = false;
  milk.rotation = 55;
  
  food1 = new Food();
  
  food1.start();

  addFood = createButton("Add food");
  addFood.position(370, 45);
  addFood.mousePressed(addFoods);

  input = createInput("Your Dog's Name");
  input.position(150, 70);

  feed = createButton("Feed your Dog");
  feed.position(450, 45);
  feed.mousePressed(feedDog);

  canvas = createCanvas(1200, 1200);
}

function draw() {  
  background(46, 139, 87);

  food1.display();


  currentTime = hour();
  if (currentTime==(lastFed+1)) {
    update("playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
update("Bathing");
foodObj.washroom();
  }else{
update("Hungry")
foodObj.display();
  }
  drawSprites();
  bedroom();{
    backgound(bedroom,550,500);
  }
  garden();{
    background(garden,550,500);
  }
  washroom();{
    backgound(washroom,550,500);
  }
  
}

function feedDog() {
  food1.getFoodStock();
  food1.updateFedTime();

  if(foodCount === 0) {
    foodCount = 0;
    milk.visible = false;
    dog.addImage(dogImg);
  } else {
    food1.updateFoodStock(foodCount - 1);
    milk.visible = true;
    dog.addImage(happyDogImg);
  }
  
  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.hide();
    dog.addImage(sadDog);
  }

}

function addFoods() {
 food1.getFoodStock();

 food1.updateFoodStock(foodCount + 1); 
}
function update(){
  database.ref('/').update({
    gameState:state

  });

}
