// Simple demo of defining an object in a class.
// https://awarua.github.io/creative-coding/tutorials/tut09/index.html


let myCookie1;
let myCookie2;
let myCookie3;
let myCookie4;

function setup(){
  createCanvas(800, 800);
  
  // Create a new cookie with sweetness 10 and no icing.
  myCookie1 = new Cookie(10, false); 
  myCookie2 = new Cookie(35, false); 
  myCookie3 = new Cookie(70, false); 
  myCookie4 = new Cookie(99, false);

  // Use console.log to show some information about the cookie
  console.log("Is Cookie 1 baked?: " + myCookie1.isBaked);
  
  // Bake the cookie
  myCookie1.bake();
  myCookie2.bake();
  myCookie3.bake();

  // Now the cookie is baked
  console.log("Is Cookie 1 baked: " +            myCookie1.isBaked);
}

function draw(){
  background(233);

  // Display the sweetness of the cookie
  // and shape
  
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(12);
  circle(60,60,140);
  text("The sweetness of \n Cookie 1 is: " + myCookie1.taste(), 60, 60);
  
  circle(350,350,140);
  text("The sweetness of \n Cookie 2 is: " + myCookie2.taste(),
   350, 350);
  
  circle(130,200,140);
  text("The sweetness of \n Cookie 3 is: " + myCookie3.taste(),
    130, 200);
  
  myCookie4.display(500,100);
}