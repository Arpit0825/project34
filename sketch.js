//Create variables here
var dog,dogImg, happyDog; 
var database; 
var foodS, foodStock;


function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);

  dog = createSprite(250,300);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }



  drawSprites();
  //add styles here
  fill("white");
  text("Note:Press UP_ARROW To Feed Drago Milk", 150,40);
  text("Food Remaining: " + foodS,200,200);

}

//function to read values in database
function readStock(data){

foodS = data.val();

}

//function to add values in database
function writeStock(x){

  if(x <= 0){

    x = 0;
  }else{
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}



