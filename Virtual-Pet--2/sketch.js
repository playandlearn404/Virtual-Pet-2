//Create variables here
var database, dog, normalDog, happyDog, foodS, foodStock, hour, time, foodObj;
function preload()
{
  //load images here
  normalDog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1200, 900);
  dog = createSprite(730, 200, 50, 50);
  dog.addImage(normalDog);
  dog.scale= 0.3;
  foodObj = new Food(); 
  feed = createButton("Feed the Dog.")
  feed.position(700, 50);
  feed.mousePressed(feedDog);
  addFood = createButton("Add food stock.");
  addFood.position(800, 50);
  addFood.mousePressed(addFoods);
  foodS = database.ref('Food');
  foodS.on("value", function(data) {
    foodS = data.val();
  })
}


function draw() {  
  background("lime");
  foodObj.display();
  drawSprites();
  //add styles here
  changeValue()
  textSize(24);
  fill('black');
  stroke("white");
  if (hour() > 12){
    text("Last time fed: " + time + "PM", 200, 50);
  }else if(hour() < 12){
    text("Last time fed: " + time + "AM", 200, 50);
  }
}

function addFoods() {
  dog.addImage(normalDog);
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}


function changeValue() {
  if(feed.mousePressed(feedDog)) {
    time = hour() % 12;
  }
}

function feedDog() {
  dog.addImage(happyDog);
  var updatedFood = foodObj.getStock();
  console.log(updatedFood);
  var final_food_stock = foodS - 1;
  foodObj.updateStock(final_food_stock);
  database.ref('/').update({
    Food: updatedFood
  })
}

// Update the background of the project based on day/night
async function getBackgroundImg() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  console.log(responseJSON);
  var datetime = responseJSON.datetime;
  hour = datetime.slice(11,13);
}